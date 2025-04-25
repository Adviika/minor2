// routes/solarPrediction.js
const express = require('express');
const router = express.Router();

const { getLatLonFromPincode } = require('../utility/geohelper');
const {
  getDayLength,
  getWeatherData,
  estimateEnergyOutput,
  electricityRates
} = require('../utility/solarApi');

router.post('/', async (req, res) => {
  const { pincode, panelArea } = req.body;

  // Basic validation
  if (!/^\d{6}$/.test(pincode) || typeof panelArea !== 'number' || panelArea <= 0) {
    return res.status(400).json({ error: 'Invalid pincode or panelArea' });
  }

  try {
    // 1) Geo lookup
    const { lat, lon, state } = await getLatLonFromPincode(pincode);

    // 2) Day-length and weather
    const dayData = await getDayLength(lat, lon);
    const weatherData = await getWeatherData(lat, lon);
    if (!dayData || !weatherData) {
      return res.status(500).json({ error: 'Insufficient data for prediction' });
    }

    const { dayLengthHours } = dayData;
    const { cloudCover } = weatherData;

    // 3) Energy calculation
    const efficiency = 0.18; // 18% panel efficiency
    const dailyKWh = estimateEnergyOutput(panelArea, efficiency, dayLengthHours, cloudCover);
    const monthlyKWh = parseFloat((dailyKWh * 30).toFixed(2));

    // 4) Savings calculation
    const rate = electricityRates[state] ?? 7.0; // ₹/kWh
    const dailySaving = parseFloat((dailyKWh * rate).toFixed(2));
    const monthlySaving = parseFloat((dailySaving * 30).toFixed(2));

    // 5) Respond
    res.json({
      location: { lat, lon, state },
      sunlightHours: dayLengthHours,
      cloudCover,
      estimatedKWhPerDay: dailyKWh,
      estimatedKWhPerMonth: monthlyKWh,
      estimatedDailySavings: dailySaving,
      estimatedMonthlySavings: monthlySaving,
    });
  } catch (err) {
    console.error('Prediction error:', err);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

module.exports = router;

const { getLatLonFromPincode } = require('../utility/geohelper');
const { getDayLength } = require('../utility/solarApi');

exports.calculatePotential = async (req, res) => {
  try {
    console.log("📩 Request body:", req.body);

    const { pincode, monthlyBill } = req.body;
    if (!pincode || !monthlyBill) {
      console.log("❗ Missing pincode or bill");
      return res.status(400).json({ error: 'Pincode and bill are required.' });
    }

    console.log("🔍 Getting coordinates for:", pincode);
    const { lat, lon, city } = await getLatLonFromPincode(pincode);
    console.log("📍 Location:", { lat, lon, city });

    console.log("☀️ Fetching solar day length...");
    const dayLengthData = await getDayLength(lat, lon);
    console.log("🌅 Day Length:", dayLengthData);

    // Estimate solar potential
    const averageSolarRadiation = 5.5; // kWh/m²/day
    const estimatedPotential = averageSolarRadiation * dayLengthData.dayLengthHours;

    res.json({
      pincode,
      location: city,
      coordinates: { lat, lon },
      dayLength: dayLengthData,
      estimatedPotential: `${estimatedPotential.toFixed(2)} kWh/m²/day`
    });

  } catch (err) {
    console.error("🔥 Full Error Stack:", err);
    res.status(500).json({ error: 'Something went wrong fetching solar data.' });
  }
};

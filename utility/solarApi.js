// utility/solarApi.js
const axios = require('axios');

// Define electricity rates for different states (example rates)
const electricityRates = {
  "Uttar Pradesh": 7.5,
  "Maharashtra": 9.20,
  "Bihar": 6.95,
  "Himachal Pradesh": 6.25,
  "Rajasthan": 8.33,
  "Madhya Pradesh": 7,
  "Gujarat": 7.2
};

// Function to get solar generation data (daylight hours)
async function getDayLength(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&timezone=auto`;

  try {
    const response = await axios.get(url);
    const data = response.data.daily;
    const sunrise = new Date(data.sunrise[0]);
    const sunset = new Date(data.sunset[0]);
    const dayLengthMs = sunset - sunrise;
    const hours = Math.floor(dayLengthMs / (1000 * 60 * 60));
    const minutes = Math.floor((dayLengthMs % (1000 * 60 * 60)) / (1000 * 60));
    const dayLengthHours = hours + minutes / 60;
    
    return {
      sunrise,
      sunset,
      dayLengthHours,
    };
  } catch (error) {
    console.error("Error fetching solar data:", error);
    return null;
  }
}

// Function to get weather data (cloud cover)
async function getWeatherData(lat, lon) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return { cloudCover: data.clouds.all };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

// Estimate energy output
function estimateEnergyOutput(panelArea, efficiency, sunlightHours, cloudCover) {
  const irradiance = 1; // kW/m² (standard)
  const cloudLossFactor = 1 - (cloudCover / 100);
  return (panelArea * efficiency * irradiance * sunlightHours * cloudLossFactor).toFixed(2);
}

module.exports = {
  getDayLength,
  getWeatherData,
  estimateEnergyOutput,
  electricityRates
};

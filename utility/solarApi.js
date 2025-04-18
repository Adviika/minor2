// utility/solarApi.js

const axios = require('axios');

async function getDayLength(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset&timezone=auto`;

  try {
    const response = await axios.get(url);
    const data = response.data.daily;

    const sunrise = data.sunrise[0];
    const sunset = data.sunset[0];

    // Parse the time strings into Date objects
    const sunriseTime = new Date(sunrise);
    const sunsetTime = new Date(sunset);

    // Calculate the difference in milliseconds
    const dayLengthMs = sunsetTime - sunriseTime;

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(dayLengthMs / (1000 * 60 * 60));
    const minutes = Math.floor((dayLengthMs % (1000 * 60 * 60)) / (1000 * 60));

    return {
      sunrise,
      sunset,
      dayLengthStr: `${hours} hrs ${minutes} mins`
    };
  } catch (error) {
    console.error("Error fetching solar data:", error);
    return null;
  }
}

module.exports = { getDayLength };

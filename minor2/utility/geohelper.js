require("dotenv").config(); // ✅ this loads .env variables into process.env
const axios = require("axios");
console.log("🔑 API KEY (geohelper):", process.env.OPENCAGE_API_KEY);
const getLatLonFromPincode = async (pincode) => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${pincode}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const result = response.data.results?.[0];

    if (!result || !result.geometry) {
      throw new Error("Invalid response from OpenCage API. No results found.");
    }

    const { lat, lng } = result.geometry;
    const city = result.components.city || result.components.town || result.components.state;

    return { lat, lon: lng, city };
  } catch (error) {
    console.error("Error in getLatLonFromPincode:", error.message);
    throw error;
  }
};

module.exports = { getLatLonFromPincode };


const tariffs = require('../data/electricityTariffs.json'); // Your converted JSON data

function getElectricityRate(state) {
  const rateEntry = tariffs.find(entry => entry.state.toLowerCase() === state.toLowerCase());
  return rateEntry ? rateEntry.rate : null;
}

module.exports = { getElectricityRate };

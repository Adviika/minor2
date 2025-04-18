const express = require('express');
const router = express.Router();
const { calculatePotential } = require('../controllers/potentialController');


router.post('/potential/calculate', calculatePotential);

module.exports = router;

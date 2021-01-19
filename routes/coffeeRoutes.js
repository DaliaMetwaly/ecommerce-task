const express = require('express');

const router = express.Router();
const coffeeController = require('../controllers/coffeeController');

router.get('/get-coffee-stuff', coffeeController.getCoffeeStuff);

module.exports = router;

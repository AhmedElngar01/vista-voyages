const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');
router.get('/', controller.getBookings);
router.post('/', controller.createBooking);
module.exports = router;
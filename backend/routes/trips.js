const express = require('express');
const router = express.Router();
const controller = require('../controllers/tripController');
router.get('/', controller.getAllTrips);
router.post('/', controller.addTrip);
router.put('/:id', controller.updateTrip);
router.delete('/:id', controller.deleteTrip);
module.exports = router;
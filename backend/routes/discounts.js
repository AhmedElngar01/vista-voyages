const express = require('express');
const router = express.Router();
const controller = require('../controllers/discountController');
router.get('/', controller.getAllDiscounts);
router.post('/', controller.addDiscount);
router.delete('/:id', controller.deleteDiscount);
module.exports = router;
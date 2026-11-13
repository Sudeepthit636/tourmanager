
const express = require('express');
const { getTours, } = require('../controllers/tourController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getTours);


module.exports = router;

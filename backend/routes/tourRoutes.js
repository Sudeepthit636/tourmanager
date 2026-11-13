
const express = require('express');
//const { getTours, addTour, updateTour, deleteTour } = require('../controllers/tourController');
const { getTours, addTour } = require('../controllers/tourController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getTours).post(protect, addTour);
//router.route('/:id').put(protect, updateTour).delete(protect, deleteTour);

module.exports = router;

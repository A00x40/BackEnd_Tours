const express = require('express');

const router = express.Router();
const tourControllers = require('../controllers/tourController');

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);

router
  .route('/:id')
  .get(tourControllers.getOneTour)
  .patch(tourControllers.UpdateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;

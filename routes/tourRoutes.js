const express = require('express');

const router = express.Router();
const tourControllers = require('../controllers/tourController');

router.param('id', tourControllers.CheckID);

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.CheckBody, tourControllers.createTour);

router
  .route('/:id')
  .get(tourControllers.getOneTour)
  .patch(tourControllers.UpdateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;

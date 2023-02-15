const express = require('express');
const validate = require('../../middlewares/validate');
const metricValidation = require('../../validations/metric.validation');
const metricController = require('../../controllers/metric.controller');

const router = express.Router();
const defaultRoute = '/';
const allRoute = '/all';
router
  .route(defaultRoute)
  .post(validate(metricValidation.create), metricController.create)
  .get(validate(metricValidation.get), metricController.get);
router.route(allRoute).get(validate(metricValidation.all), metricController.all);

module.exports = router;

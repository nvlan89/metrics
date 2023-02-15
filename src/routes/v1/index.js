const express = require('express');
const metricRoute = require('./metric.route');
const { applicationRoutes } = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: applicationRoutes.metrics,
    route: metricRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

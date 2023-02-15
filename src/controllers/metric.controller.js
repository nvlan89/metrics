const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { metricService } = require('../services');
const pick = require('../utils/pick');

const create = catchAsync(async (req, res) => {
  const metric = await metricService.create(req.body);
  res.status(httpStatus.CREATED).send(metric);
});

const get = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'unit', 'period']);
  const metrics = await metricService.queryMetrics(filter);
  res.send(metrics);
});

const all = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['type', 'unit']);
  const options = pick(req.query, ['limit', 'page']);
  const metrics = await metricService.getAllMetric(filter, options);
  res.send(metrics);
});

module.exports = {
  create,
  get,
  all,
};

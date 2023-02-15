const moment = require('moment');
const { Distance, Temperature } = require('../models');
const { distanceType } = require('../config/metric');

/**
 * Create a metric
 * @param {Object} metricBody
 * @returns {Promise<Distance> | Promise<Promise<Distance>>}
 */
const create = async (metricBody) => {
  const { type } = metricBody;
  if (type === distanceType) return Distance.create(metricBody);
  return Temperature.create(metricBody);
};

const buildQuery = (filter) => {
  const { period } = filter;

  if (!period) {
    return [{ $match: {} }];
  }

  const now = moment();
  const date = moment().subtract(period, 'months').toDate();
  return [
    {
      $match: { date: { $gte: date, $lt: now.toDate() } },
    },
    {
      $sort: {
        date: 1,
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        doc: { $last: '$$ROOT' },
      },
    },
    { $replaceRoot: { newRoot: '$doc' } },
  ];
};

const formatValue = (unit, docs) => {
  if (!unit) return docs;
  return docs.map((doc) => {
    const data = doc._doc ? doc._doc : doc;
    const value = data[`valueIn${unit}`];
    return {
      ...data,
      value,
    };
  });
};

const prepareValues = (unit, docs) => {
  const values = formatValue(unit, docs);
  return values;
};

const getLisMetrics = async (filter) => {
  const { type, unit } = filter;
  const query = buildQuery(filter);
  const values = type === distanceType ? await Distance.aggregate(query) : await Temperature.aggregate(query);
  const results = prepareValues(unit, values);
  return results;
};

const queryMetrics = async (filter) => {
  const results = await getLisMetrics(filter);
  return results;
};

const getAllMetric = async (filter, options) => {
  const { type, unit } = filter;
  const values = type === distanceType ? await Distance.paginate({}, options) : await Temperature.paginate({}, options);
  const prepareResult = prepareValues(unit, values.docs);
  return { ...values, docs: prepareResult };
};

module.exports = {
  create,
  queryMetrics,
  getAllMetric,
};

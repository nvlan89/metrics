const Joi = require('joi');
const { metricTypes, distanceType } = require('../config/metric');
const { unitOfDistance } = require('../config/distance');
const { unitOfTemperature } = require('../config/temperature');

const create = {
  body: Joi.object().keys({
    type: Joi.string()
      .required()
      .valid(...metricTypes),
    date: Joi.date().required().iso(),
    value: Joi.when('type', { is: distanceType, then: Joi.number().positive(), otherwise: Joi.number().integer() }),
    unit: Joi.string()
      .required()
      .when('type', {
        is: distanceType,
        then: Joi.valid(...unitOfDistance),
        otherwise: Joi.valid(...unitOfTemperature),
      }),
  }),
};

const all = {
  query: Joi.object().keys({
    type: Joi.string()
      .required()
      .valid(...metricTypes),
    unit: Joi.string().when('type', {
      is: distanceType,
      then: Joi.valid(...unitOfDistance),
      otherwise: Joi.valid(...unitOfTemperature),
    }),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const get = {
  query: Joi.object().keys({
    type: Joi.string()
      .required()
      .valid(...metricTypes),
    unit: Joi.string().when('type', {
      is: distanceType,
      then: Joi.valid(...unitOfDistance),
      otherwise: Joi.valid(...unitOfTemperature),
    }),
    period: Joi.number().positive(),
  }),
};

module.exports = {
  create,
  get,
  all,
};

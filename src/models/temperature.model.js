const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');

const { unitOfTemperature } = require('../config/temperature');
const convertTemperature = require('../utils/convertTemperature');

const temperatureSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    value: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
    unit: {
      type: String,
      enum: unitOfTemperature,
      require: true,
    },
    valueInC: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
    valueInF: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
    valueInK: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
temperatureSchema.plugin(toJSON);
temperatureSchema.plugin(mongoosePaginate);

temperatureSchema.pre('save', function () {
  const { value, unit } = this;
  const { valueInC, valueInF, valueInK } = convertTemperature(value, unit);
  this.valueInC = valueInC;
  this.valueInF = valueInF;
  this.valueInK = valueInK;
});

/**
 * @typedef temperature
 */
const Temperature = mongoose.model('Temperature', temperatureSchema);

module.exports = Temperature;

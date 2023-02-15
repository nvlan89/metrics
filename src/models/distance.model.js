const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { toJSON } = require('./plugins');
const { unitOfDistance } = require('../config/distance');
const convertDistance = require('../utils/convertDistance');

const distanceSchema = mongoose.Schema(
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
      enum: unitOfDistance,
      require: true,
    },
    valueInm: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
    valueIncm: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
    valueInin: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
    valueInft: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
    valueInyd: {
      type: mongoose.Types.Decimal128,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
distanceSchema.plugin(toJSON);
distanceSchema.plugin(mongoosePaginate);

distanceSchema.pre('save', function () {
  const { value, unit } = this;
  const { valueInM, valueInCm, valueInIn, valueInFt, valueInYd } = convertDistance(value, unit);
  this.valueIncm = valueInCm;
  this.valueInin = valueInIn;
  this.valueInft = valueInFt;
  this.valueInyd = valueInYd;
  this.valueInm = valueInM;
});

/**
 * @typedef Distance
 */
const Distance = mongoose.model('Distance', distanceSchema);

module.exports = Distance;

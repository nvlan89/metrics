// 'm', 'cm', 'in', 'ft', 'yd'
// convert distance
const convertDistance = (value, unit) => {
  // convert to meters
  let valueInM = value;
  if (unit === 'cm') {
    valueInM = value / 100;
  } else if (unit === 'in') {
    valueInM = value / 39.3701;
  } else if (unit === 'ft') {
    valueInM = value / 3.28084;
  } else if (unit === 'yd') {
    valueInM = value / 1.09361;
  }

  // convert to centimeters
  const valueInCm = valueInM * 100;

  // convert to inches
  const valueInIn = valueInM * 39.3701;

  // convert to feet
  const valueInFt = valueInM * 3.28084;

  // convert to yards
  const valueInYd = valueInM * 1.09361;

  return { valueInM, valueInCm, valueInIn, valueInFt, valueInYd };
};

module.exports = convertDistance;

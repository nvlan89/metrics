const convertTemperature = (value, unit) => {
  // convert to celsius
  let valueInC = 0;
  if (unit === 'C') {
    valueInC = value;
  }
  if (unit === 'F') {
    valueInC = (value - 32) * (5 / 9);
  }
  if (unit === 'K') {
    valueInC = value - 273.15;
  }
  // convert to fahrenheit
  const valueInF = valueInC * (9 / 5) + 32;
  // convert to kelvin
  const valueInK = valueInC + 273.15;
  return { valueInC, valueInF, valueInK };
};

module.exports = convertTemperature;

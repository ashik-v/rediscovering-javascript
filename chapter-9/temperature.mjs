// inlining aka named export (prefer of exporting explicitly)
export const FREEZING_POINT = 0;

export function fc2(farenheit) {
  return (farenheit - 32) / 1.8;
}

export const temperaturePoints = { freezing: 0, boiling: 100 };

export class Thermostat {
  constructor() {

  }
}

const FREEZING_POINT_IN_F = 32;

// exporting explicitly (most useful when exporting only a subset of multiple declarations)
function c2f(celsius) {
  return celsius * 1.8 + 32;
}

const FREEZING_POINT_IN_K = 273.15, BOILING_POINT_IN_K = 373.15;

export { c2f, FREEZING_POINT_IN_K };

// exporting with a different name
function c2k(celsius) {
  return celsius + 273.15;
}

export { c2k as celsiusToKelvin };

// export default
export default function unitsOfMeasure() {
  // the name is not visible to the importing file so if this file does not care about the name you may omit it entirely
  return ['Celsius', 'Delisle scale', 'Farenheit', 'Kelvin', /*...*/];
}

// export other files
export { right } from './right.mjs'
// named import
import { FREEZING_POINT, celsiusToKelvin } from './temperature.mjs';

// resolve conflicts by re-naming imports or by importing to a namespace i.e. import * as foo from 'location'

// import default
import foo from './temperature.mjs'; // no {} otherwise it will look for something called foo in the module
console.log(foo); // this is the default export

// importing everything in one go and assigning to a namespace
import uom, * as bar from './temperature.mjs';
console.log(bar.temperaturePoints); // namespace

// importing side effects (i.e. run the code but not actually import anything)
import './temperature.mjs';

// aliasing
import { temperaturePoints as baz } from './temperature.mjs';
console.log(baz);
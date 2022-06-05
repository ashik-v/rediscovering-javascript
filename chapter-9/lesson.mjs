// modules help to modularize code -> are in strict mode by default -> can only use what's imported and other's can only use what is exported
// .mjs indicates module files

// js does not load the same module again if it has already imported it
import { right } from './right.mjs';
import { middle } from './middle.mjs'; // doesn't log 'hello from the right module again'

right();
middle();

// ways to export (look at temperature.mjs):
  // inline aka named export
  // export explicitly at the end
  // export as a different name
  // export default (for a major, most significant or only export) -> can only have 1 default export
      // when importing a default function the name default is is what is used in the importing module (but you can bind another name to it if you so choose)
  // export other files altogether to make dependencies more manageable
      // this will not export any default references however so watch out for that
      // if you want to reexport the default you will have to do it as export { default as whatever } from ...
      // use * to reexport everything from a directory

// importing from a module
  // named import using import { whatever } from 'location'
  // import the default by omitting {}
  // import everything into a namespace using import * as whatever from location
  // resolve conflicts by binding to another name using 'as' or to a namespace

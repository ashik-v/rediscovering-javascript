console.log('hello from the right module');

const message = 'right called';

export const right = function() { // only this is visible / can be called from outside this module file
  console.log(message);
}
import { right } from './right.mjs';

console.log('hello from the middle module');

export const middle = function() {
  console.log('middle called');
}
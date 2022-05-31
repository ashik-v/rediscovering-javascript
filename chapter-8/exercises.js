'use strict'
// exercise 1
class FunctionalSet extends Set {
  filter(selector) {
    return new FunctionalSet([...this.keys()].filter(selector)) // can just destructure sets, no need for this.keys()
  }

  map(selector) {
    return new FunctionalSet([...this].map(selector));
  }

  reduce(selector, startingValue) {
    return [...this].reduce(selector, startingValue);
  }
}

const set = new FunctionalSet(['Jack', 'Jill', 'Tom', 'Jerry']);

const jSet = set.filter(name => name.startsWith('J'));
const allCaps = set.map(name => name.toUpperCase());
const totalLengthOfJWords = set.filter(name => name.startsWith('J')).reduce((total, word) => total + word.length, 0);

console.log(jSet);
console.log(allCaps);
console.log(totalLengthOfJWords);

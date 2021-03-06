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

// exercise 2
// can use the same impementation as before since Set returns the runtime instance

console.log('*********');

// exercise 3
class BoundedSet extends Set {
  constructor(capacity, elements) {
    if(elements.length > capacity) {
      super()
      this.capacity = capacity
    } else {
      super(elements);
      this.capacity = capacity;
    }
  }

  add(element) {
    super.add(element);
    if([...this.values()].length > this.capacity) {
      this.delete(element)
      throw new Error(`exceeded capacity of ${this.capacity} elements`);
    }
  }
}

const set1 = new BoundedSet(5, ['Apple', 'Banana', 'Grape', 'Mangoe']);

set1.add('Orange');
set1.add('Apple');

try {
  set1.add('Tangerine');
} catch(ex) {
  console.log(ex.message); // exceeded capacity of 5 elements
}

set1.delete('Grape');
set1.add('Peach');
console.log(set1.size); // 5

const set2 = new BoundedSet(2, ['Apple', 'Banana', 'Grape']);
console.log(set2.size); // 0
console.log(set2); // BoundedSet { capacity: 2 }

console.log('*********');

// exercise 4
class Base {
  copy(object) {
    const constructor = this.constructor[Symbol.species] || this.constructor;
    return new constructor(object);
  }
}

class Derived1 extends Base {
  static get [Symbol.species]() { // removing static yields Derived1 - why?
    return Base
  }
}

class Derived2 extends Base {
  static get [Symbol.species]() {
    return Derived2
  }
}

const derived1 = new Derived1();
const derived2 = new Derived2();

console.log(derived1.copy()); // Base {}
console.log(derived2.copy()); // Derived2 {}

console.log('*********');

// exercise 5
class SpecialWordChecker {
  isSpecial(word) { return false }
}

class PalindromeChecker extends SpecialWordChecker {
  reversedWord(word) { return [...word].reverse().join("") }
  isSpecial(word) { return word === this.reversedWord(word) || super.isSpecial(word) }
}

class AlphabeticalChecker extends SpecialWordChecker {
  sortedWord(word) {
    return [...word].sort().join("");
  }

  isSpecial(word) { return word === this.sortedWord(word) || super.isSpecial(word) }
}

// class AlphabeticalOrPalindromeChecker extends SpecialWordChecker {
//   constructor() {
//     super();
//     this.palindromeChecker = new PalindromeChecker();
//     this.alphabeticalChecker = new AlphabeticalChecker();
//   }

//   isSpecial(word) {
//     return this.palindromeChecker.isSpecial(word) || this.alphabeticalChecker.isSpecial(word);
//   }
// }

const checkIfSpecial = function(specialWordChecker, word) {
  const result = specialWordChecker.isSpecial(word) ? 'is' : 'is not';
  console.log(`${word} ${result} special`);
};

const palindromeChecker = new PalindromeChecker();
checkIfSpecial(palindromeChecker, 'mom'); // mom is special
checkIfSpecial(palindromeChecker, 'abe'); // abe is not special

const alphabeticalChecker = new AlphabeticalChecker();
checkIfSpecial(alphabeticalChecker, 'mom'); // mom is not special
checkIfSpecial(alphabeticalChecker, 'abe'); // abe is special

Object.setPrototypeOf(Object.getPrototypeOf(new PalindromeChecker), new AlphabeticalChecker);

const alphabeticalOrPalindromeChecker = new PalindromeChecker();
checkIfSpecial(alphabeticalOrPalindromeChecker, 'mom'); //mom is special
checkIfSpecial(alphabeticalOrPalindromeChecker, 'abe'); //abe is special
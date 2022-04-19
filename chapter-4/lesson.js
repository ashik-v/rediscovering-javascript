//output element and type of an array using for...of
const names = ['ashik', 'michelle'];
for(name of names) {
  console.log(name);
}

//output element using .entries
for (const entry of names.entries()) {
  console.log(entry);
}
// access to the index too
for (const [index, name] of names.entries()) {
  console.log(`${index}: ${name}`);
}

console.log('**********');

//symbols

//create hidden properties using Symbol
const age = Symbol('ageValue');

const sam = {
  [age]: 4,
  name: 'Sam'
}

for (property in sam) {
  console.log(property); //age is hidden
}

console.log(sam); //but not really

console.log(Object.getOwnPropertySymbols(sam));

sam[age] = 5;

console.log(sam); //not immutable

console.log(Object.getOwnPropertyNames(sam));

console.log('**********');

//global registry

const tom = Symbol('Tom');
const anotherTom = Symbol('Tom');
console.log(tom === anotherTom);

const jerry = Symbol.for('Jerry');
const anotherJerry = Symbol.for('Jerry');
console.log(jerry === anotherJerry);

console.log('**********');

//special well known symbols

//using custom iterators and generators

class CardDeck {
  constructor() {
    this.suitShapes = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  [Symbol.iterator]() {
    let i = -1;
    const self = this;
    return {
      next() {
        i++;
        return {
          done: i >= self.suitShapes.length,
          value: self.suitShapes[i]
        }
      }
    }
  }
}

deck = new CardDeck;

for (const suit of deck) {
  console.log(suit);
}

console.log('**********');

class BetterCardDeck {
  constructor() {
    this.suitShapes = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  *[Symbol.iterator]() {
    for (const suit of this.suitShapes) {
      yield suit;
    }
  }
}

betterDeck = new BetterCardDeck;

for (const suit of betterDeck) {
  console.log(suit);
}

console.log('**********');

class BestCardDeck {
  constructor() {
    this.suitShapes = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  *suits() {
    for (const suit of this.suitShapes) {
      yield suit;
    }
  }

  *pips() {
    yield 'King';
    yield 'Queen';
    yield 'Jack';
    yield 'Ace'

    for (let i = 2; i <= 10; i++) {
      yield i;
    }
  }

  *suitsAndPips() {
    yield* this.suits();
    yield* this.pips();
  }
}

const bestCardDeck = new BestCardDeck;

for (const suit of bestCardDeck.suits()) {
  console.log(suit)
}
console.log('**********');
for (const pip of bestCardDeck.pips()){
  console.log(pip);
}
console.log('**********');
for (const suitAndPip of bestCardDeck.suitsAndPips()) {
  console.log(suitAndPip);
}

console.log('**********');

//infinite sequences
const isPrime = (number) => {
  for (let i = 2; i < number; i++) {
    if (number % i === 0) return false;
  }
  return number > 1;
}

const primeStartingFrom = function*(start) {
  let index = start
  while(true) {
    if(isPrime(index)) yield index;
    index++;
  }
}

for (number of primeStartingFrom(25)) {
  console.log(number);
  if (number > 40) break;
}
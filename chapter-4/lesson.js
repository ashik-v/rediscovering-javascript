//output element and type of an array using for...of
const names = ['ashik', 'michelle', 'john'];
for(const name of names) {
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
const sensitiveInformation = Symbol('sensitiveInformation');

const sam = {
  age: 7,
  name: 'sam',
  [sensitiveInformation]: 'gotcha!'
}

for (property in sam) {
  console.log(property); //age is hidden
}

console.log(Object.getOwnPropertyNames(sam));
console.log(Object.getOwnPropertySymbols(sam));

console.log(sam);

sam[sensitiveInformation] = 'gotcha again!'

console.log(Object.getOwnPropertySymbols(sam));
console.log(sam);

console.log('**********');

//global registry
const tom = Symbol('Tom');
const anotherTom = Symbol('Tom');
console.log(tom === anotherTom);

const jerry = Symbol.for('Jerry');
const anotherJerry = Symbol.for('Jerry');
console.log(anotherJerry === jerry);

console.log('**********');

//special well known symbols

//using custom iterators and generators
class CardDeck {
  constructor() {
    this.suitShapes = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  [Symbol.iterator]() {
    let index = -1;
    const self = this;
    return {
      next() {
        index++;
        return {
          done: index >= self.suitShapes.length,
          value: self.suitShapes[index]
        }
      }
    }
  }
}

const cardDeck = new CardDeck;

for (suit of cardDeck) {
  console.log(suit);
}

console.log('**********');

class BetterCardDeck {
  constructor() {
    this.suitShapes = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  *[Symbol.iterator]() {
    for (const shape of this.suitShapes){
      yield shape;
    }
  }
}

const betterCardDeck = new BetterCardDeck;

for (suit of betterCardDeck) {
  console.log(suit);
}

console.log('**********');

class BestCardDeck {
  constructor() {
    this.suitShapes = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  *suits() {
    for (const shape of this.suitShapes){
      yield shape;
    }
  }

  *pips() {
    yield 'King';
    yield 'Queen';
    yield 'Jack';
    yield 'Ace'

    for (let pip = 10; pip >= 2; pip--) {
      yield pip;
    }
  }

  *suitsAndPips() {
    yield* this.suits();
    yield* this.pips();
  }
}

const bestCardDeck = new BestCardDeck;

for (suit of bestCardDeck.suits()) {
  console.log(suit);
}

console.log('**********');

for (pip of bestCardDeck.pips()) {
  console.log(pip);
}

console.log('**********');

for (suitsAndPip of bestCardDeck.suitsAndPips()) {
  console.log(suitsAndPip);
}

console.log('**********');

//infinite sequences
const isPrime = (number) => {
  let i = 2;
  while (i < number) {
    if (number % i === 0) return false;
    i++;
  }
  return number > 1;
}

const primeStartingFrom = function*(start){
  let number = start;
  while(true) {
    if (isPrime(number)) yield number;
    number++
  }
}

for (number of primeStartingFrom(25)) {
  console.log(number);
  if (number > 100) break;
}
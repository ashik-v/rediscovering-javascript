//output element and type of an array using for...of
const names = ['ashik', 'john', 'michelle', 11];

for(const name of names) {
  console.log(`${name}: ${typeof name}`)
}

//output element using .entries
for(const entry of names.entries()) {
  console.log(entry);
}
// access to the index too
for(const [index, name] of names.entries()) {
  console.log(index, name);
}

console.log('**********');

//symbols

//create hidden properties using Symbol
const age = Symbol('ageValue');

const sam = {
  [age]: 3,
  name: 'Sam'
}

for(property in sam) { //notice property in notation and that age is skipped
  console.log(`${property}: ${sam[property]}`)
}

console.log(Object.getOwnPropertyNames(sam)); //ageValue is hidden
console.log(Object.getOwnPropertySymbols(sam));

sam[age] = 10;
console.log(sam[age]); //immutable

console.log(sam.name); //dot notation must match
const foo = 'name';
console.log(sam[foo]); //bracket notation needs to evaluate

console.log('**********');

//global registry
let tom = Symbol('Tom');
let anotherTom = Symbol('Tom');
console.log(tom === anotherTom); //false

tom = Symbol.for('Tom');
anotherTom = Symbol.for('Tom');
console.log(tom === anotherTom); //true

console.log('**********');

//special well known symbols

//using custom iterators and generators

class CardDeck {
  constructor() {
    this.suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  [Symbol.iterator]() {
    const self = this;
    let i = -1;
    return {
      next() {
        i++;
        return {
          done: i >= self.suits.length,
          value: self.suits[i]
        }
      }
    }
  }
}

cardDeck = new CardDeck;

for(const suit of cardDeck) {
  console.log(suit)
}

console.log('**********');

class BetterCardDeck {
  constructor() {
    this.suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  *[Symbol.iterator](){
    for(const suit of this.suits) {
      yield suit;
    }
  }
}

betterCardDeck = new BetterCardDeck;

for(const suit of betterCardDeck){
  console.log(suit);
}

console.log('**********');

class BestCardDeck {
  constructor() {
    this.suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  *suitShapes() {
    for(const suit of this.suits) {
      yield suit;
    }
  }

  *pips() {
    yield 'King';
    yield 'Queen';
    yield 'Jack';
    yield 'Ace';

    for(let i = 2; i <= 10; i++) {
      yield i;
    }
  }

  *suitsAndPips(){
    yield* this.suitShapes();
    yield* this.pips();
  }
}

bestCardDeck = new BestCardDeck;

for(const suit of bestCardDeck.suitShapes()) {
  console.log(suit);
}
console.log('**********');
for(const pip of bestCardDeck.pips()) {
  console.log(pip);
}
console.log('**********');
for(const suitAndPip of bestCardDeck.suitsAndPips()) {
  console.log(suitAndPip);
}


console.log('\n**********');

//function to test if a number is prime or not
const isPrime = (number) => {
  for(let i = 2; i < number; i++) {
    if(number % i === 0) {
      return false;
    }
    return number > 1;
  }
}

const primerStartingFrom = function*(number) {
  let index = number;

  while(true) {
    if(isPrime(index)) yield index;
    index++;
  }
}

for(const number of primerStartingFrom(10)) {
  console.log(number, ' ');
  if(number > 25) break;
}
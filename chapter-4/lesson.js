//for...of
const names = ['ashik', 11, 'john', 'subash', 'mini'];
for(const name of names) {
  //name = 'foo'; // name is an immutable constant so this will fail
  console.log(typeof name)
  console.log(name); // name has block scope
}

console.log('**********');

//object.entries
console.log(names.entries()); //returns an iterator
for (const name of names.entries()) {
  console.log(name);
}
// but what if you want access to the index too
for (const [i, name] of names.entries()) { // destructuring
  console.log(`index ${i}: name: ${name}`);
}

console.log('**********');

//symbols

//hidden props
const age = Symbol('ageValue'); //declaring a symbol
const email = 'emailValue';

const sam = {
  first: 'Sam',
  [email]: 'sam@example.com', //this defines a property with name 'emailValue'
  [age]: 2
}

for(property in sam) {
  console.log(`${property}: ${sam[property]}`); //age is skipped since it's a Symbol
}

console.log(Object.getOwnPropertyNames(sam)); //age is skipped since it's a Symbol
console.log(Object.getOwnPropertySymbols(sam)); //symbols are not private or hidden
console.log(sam[age]); //symbols are not private or hidden
sam[age] = 13 //symbol properties are not immutable

//When using a dot, the part after the dot must be a valid variable name,
//and it directly names the property.
//When using square brackets, the expression between the brackets is evaluated to get the property name
console.log(sam.first);
const foo = 'first'
console.log(sam[foo]);
console.log(sam.emailValue);

console.log(sam[age]);

console.log('**********');

//global registry
const tom = Symbol('tom');
const anotherTom = Symbol('tom');
console.log(tom === anotherTom); //each call to Symbol creates a unique symbol

const jerry = Symbol.for('jerry');
const anotherJerry = Symbol.for('jerry');
console.log(jerry === anotherJerry); //each call to Symbol.for does not create a unique symbol if one already exists in the global registry

console.log('**********');

//special well known symbols

//using custom iterators and generators
class CardDeck {
  constructor() {
    this.suitShapes = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  [Symbol.iterator]() {
    let i = -1;
    const self = this; //to make sure that you are continue to reference the object
    return {
      next() {
        i++;
        return {
          done: i >= self.suitShapes.length,
          value: self.suitShapes[i]
        };
      }
    }
  }
}

const deck = new CardDeck;

for (const suit of deck) {
  console.log(suit);
}

console.log('**********');

class BetterCardDeck {
  constructor() {
    this.suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  *[Symbol.iterator]() { //* only needed if the iterator uses a yield
    for(const suit of this.suits) {
      yield suit;
    }
  }
}

const betterDeck = new BetterCardDeck;

for (const suit of betterDeck) {
  console.log(suit);
}

console.log('**********');

class BestCardDeck {
  constructor() {
    this.suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  }

  *suitShapes() { //this can't be the same name as 'suits'
    for(const suit of this.suits) {
      yield suit;
    }
  }

  *pips() { //another generator with multiple yields
    yield 'Ace';
    yield 'King';
    yield 'Queen';
    yield 'Jack';

    for(let i = 10; i > 1; i--) {
      yield i.toString();
    }
  }

  *suitsAndPips() { //combining two generators
    yield* this.suitShapes();
    yield* this.pips();
  }
}

const bestDeck = new BestCardDeck;

for(const suit of bestDeck.suitShapes()) {
  console.log(suit);
}

console.log('**********');

for(const suit of bestDeck.suits) { //why not just do this instead of going through all the trouble above
  console.log(suit);
}

console.log('**********');

for (const pip of bestDeck.pips()) {
  process.stdout.write(pip + ' ');
}

console.log('\n**********');

for (const suitAndPip of bestDeck.suitsAndPips()) {
  process.stdout.write(suitAndPip + ' ');
}

console.log('\n**********');

const isPrime = (number) => {
  for(let i = 2; i < number; i++){
    if (number % i == 0) return false;
  }
  return number > 1
}

const primeStartingFrom = function*(start) {
  let index = start;

  while(true) {
    if(isPrime(index)) yield index;
    index++;
  }
}

for(const number of primeStartingFrom(10)) { //how to iterate over this generator without a for...of loop
  console.log(number + ', ');
  if(number > 25) break;
}


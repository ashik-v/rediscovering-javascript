//exercise 1
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

for (const [index, letter] of letters.entries()) {
  if (index % 3 === 0) console.log(letter)
}

console.log('**********');

//exercise 2
const numbers = [1, 2, 3];
console.log("The Symbol properties in arrays are: ");
console.log(Object.getOwnPropertySymbols(Object.getPrototypeOf(numbers)));


console.log('**********');

//exercise 3
class Message {
  constructor(text) { this.text = text; }

  [Symbol.replace](message, substitute) {
    return this.text.replace(message, substitute); //what is going on lol
  }
}

const message = new Message('There are no stupid questions.');

console.log('stupid'.replace(message, 's*****'));
//there are no s***** questions.

console.log(''.replace(message, 'Yes, '));
//Yes, There are no stupid questions.

console.log('**********');

//exercise 4
const fibonacciSeries = function*() {
  let current = 1, next = 1;
  yield* [current, next];

  while(true) {
    const output = current + next;
    current = next
    next = output;
    yield output;
  }
}

for (number of fibonacciSeries()) {
  if (number > 25) break;
  console.log(number);
}

console.log('\n**********');

//exercise 5
const fibonacciSeriesWithIndex = function*(){
  let current = 1, next = 1, index = 1;
  yield* [[index++, current], [index++, next]];

  while(true) {
    const output = current + next;
    current = next;
    next = output;
    yield [index++, output];
  }
}

for(const [index, value] of fibonacciSeriesWithIndex()) {
  if(index > 10) break;
  console.log(value);
}
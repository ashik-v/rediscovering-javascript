//exercise 1
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
for (const [index, letter] of letters) {
  if (index % 3 === 0) console.log(number)
}

console.log('**********');

//exercise 2
const numbers = [1, 2, 3];
console.log("The Symbol properties in arrays are: ");
console.log(Object.getOwnPropertySymbols(Object.getPrototypeOf(numbers)));

console.log('**********');

//exercise 3
class Message {
  constructor(message) { this.message = message; }

  [Symbol.replace](from, to) {
    return this.message.replace(from, to);
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
  yield*[current, next];

  while(true) {
    const output = current + next;
    current = next;
    next = output;
    yield output
  }
}

for (number of fibonacciSeries()) {
  if (number > 25) break;
  console.log(number);
}

console.log('**********');

//exercise 5
const fibonacciSeriesWithIndex = function*() {
  let current = 1, next = 1, index = 0;
  yield* [[index++, current], [index++, next]];

  while(true) {
    index++;
    const output = current + next;
    current = next;
    next = output;
    yield [index, output];
  }
}
for(const [index, value] of fibonacciSeriesWithIndex()) {
  if(index > 10) break;
  console.log(value);
}
//exercise 1
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

for(let i = 0; i < letters.length; i += 3) {
  console.log(letters[i]);
}

for(const letter of letters) {
  if(letters.indexOf(letter, 0) % 3 == 0) console.log(letter);
}

console.log('**********');

//exercise 2
const numbers = [1, 2, 3];
console.log("The Symbol properties in arrays are: ");
console.log(
  Object.getOwnPropertySymbols(Object.getPrototypeOf(numbers))
);

console.log('**********');

//exercise 3
class Message {
  constructor(text) { this.text = text; }
  [Symbol.replace](word, substitute) { //why doesn't having a function called replace() work as a substitute
    return this.text.replace(word, substitute);
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
  let current = 1;
  let next = 1;
  yield* [current, next];

  while(true) {
    const temp = current;
    current = next;
    next = next + temp;
    yield next;
  }
}
for(const value of fibonacciSeries()) {
  if(value > 25) break;
  process.stdout.write(value + ', ');
}

console.log('\n**********');

//exercise 5
const fibonacciSeriesWithIndex = function*() {
  let current = 1;
  let next = 1;
  let index = 0;

  yield* [[index++, current], [index++, next]];

  while(true) {
    const temp = current;
    current = next;
    next = next + temp;

    yield [index++, next]
  }
}

for(const [index, value] of fibonacciSeriesWithIndex()) {
  if(index > 8) break;
  process.stdout.write(value + ', ');
}
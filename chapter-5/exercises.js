//exercise 1

//lexical scoping -> arrow functions
this.someValue = 'someValue';

const anArrowFunc = () => {
  console.log(this.someValue);
}
anArrowFunc();
//dynamic scoping -> anonymous functions
const anAnonymousFunc = function() {
  console.log(this.someValue);
}
anAnonymousFunc();

console.log('*********')

//exercise 2
const success = (value) => ({ value: value });

const blowup = (value) => { throw new Error('blowing up with value ' + value) };

const process = (successFn, errorFn) => {
  const value = Math.round(Math.random() * 100, 2);

  if(value > 50) {
    return successFn(value);
  } else {
    return errorFn(value);
  }
};

try {
  console.log(process(success, blowup));
} catch(ex) {
  console.log(ex.message);
}

console.log('*********')

//exercise 3
const greet = (...names) => console.log(names.join(', '));

const helloJackJill = greet.bind(null, 'hello', 'Jack', 'Jill');

helloJackJill();

console.log('*********')

//exercise 4
const sam = {
  name: 'Sam',
  age: 2,
  play: (toy) => 'I am ' + sam.name + ', age ' + sam.age + ' with ' + toy
};

console.log(sam.play('ball'));

console.log('*********')

//exercise 5
const numbers = [1, 5, 2, 6, 8, 3, 4, 9, 7 , 6];

let totalOfDoubleOfEven = 0;

for (const number of numbers) {
  if (number % 2 === 0) {
    totalOfDoubleOfEven += number * 2;
  }
}

console.log(totalOfDoubleOfEven);

const isEven = (number) => {
  return number % 2 === 0;
}

const double = (number) => {
  return number * 2;
}

const result = numbers
  .filter( number => isEven(number))
  .map( number => double(number) )
  .reduce( (previousValue, currentValue) => previousValue + currentValue )

console.log(result);

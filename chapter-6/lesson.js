// template literals
const firstName = 'Ashik';
const lastName = 'Varghese';
console.log(`Hi my name is "${firstName} ${lastName.toUpperCase()}"`); //preserve quotes and can call other functions

console.log('**********');

let value = 4;

const msg1 = `The value is ${value}`; //template literal is evaluated and stored
const print = () => `The value is ${value}`; //template literal is evaluated only when the function is called

value = 0;

console.log(msg1);
console.log(print());

console.log('**********')

const hours = 8;
const event = 'conference';
console.log(`This ${event} will occur at ${ hours > 12 ? `${hours-12} PM.` : `${hours} AM`} `) //nested template literals are possible but...

const amOrPm = (hours) => `${ hours > 12 ? `${hours-12} PM.` : `${hours} AM`}`

console.log(`This ${event} will occur at ${ amOrPm(hours) }`) // reads better

console.log('**********')

//multiline strings
const message = `Hi Luke,
I am your father.
  Thanks`;
console.log(message);

console.log('**********');

//tagged template literal - String.raw
console.log('some special characters: \\ \\b \\n \'');
console.log("some special characters: \\ \\b \\n '"); //saves a backslash on the ' when you use ""
console.log(String.raw`some special characters: \ \b \n '`); //less noisy to use the String.raw tag

const printDetails = (texts, ...expressions) => {
  console.log(texts);
  console.log(expressions);
};

//custom tag
const name = 'John';
const otherName = 'Ashik'
printDetails`Hello ${name} and ${otherName}, how are you?`;

// custom tag that masks sensitive info
const mask = (texts, ...expressions) => {
  const createMask = (text) => '*'.repeat(text.length);
  const maskedText = expressions.map((expression, index) => `${texts[index]} ${createMask(expression)}`).join('');
  const closingTexts = texts[texts.length - 1];

  return `${maskedText}${closingTexts}`
}

const agent = 'Bond';
const organization = 'MI6';

console.log(mask`Hi, I'm ${agent}, with ${organization}.`);

console.log('**********');

//enhanced object literals
const createPerson = (name, age, sport, sportFn) => {
  return {
    name, // no need for name: name
    age,
    toString: function() {
      return `${this.name} ${this.age}`;
    },
  [`play${sport}`]: sportFn //use template literal instad of person['play' + sport] and have the computed propetry in the returned object
  };
};

const sam = createPerson('Sam', 21, 'Soccer', function() { console.log(`${this.name}, kick, don't touch`); });

console.log(sam.name);
console.log(sam.toString());
sam.playSoccer();

console.log('**********');

// array destructuring
const getPresidentName = function() {
  return ['John', 'Quincy', 'Adams'];
}

const [first, middle, last] = getPresidentName(); //array destructuring
console.log(first, middle, last);
const [first2] = getPresidentName(); //only getting the first name
console.log(first2);
const [,middle2, last2] = getPresidentName(); //skipping the first name
console.log(middle2, last2);
const [first3, middle3, last3, foo] = getPresidentName(); //extra variable does not cause any issues
console.log(first3, middle3, last3, foo);
const[, , ,bar = 'baz'] = getPresidentName(); //using a default value when one isn't provided
console.log(bar);
const[first4, ...rest] = getPresidentName(); //rest extraction
console.log(first4, rest);

let [a, b] = [1, 2];
[a, b] = [b, a]; //easy way to swap values
console.log(a, b);

const printFirstAndLastOnly = function([first, , last]) { //destructuring in parameter list
  console.log(`${first} ${last}`);
};
printFirstAndLastOnly(['John', 'Q', 'Adams']);

//object destructuring


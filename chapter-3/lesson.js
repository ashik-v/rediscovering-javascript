//rest used on the declaration side
const max = (...values) => {
  console.log(values instanceof Array);

  let large = values[0];

  for(let i = 0; i < values.length; i++) {
    if(values[i] > large) {
      large = values[i];
    }
  }
  return large;
}

console.log(max(2,1,2,11,9));

const terser_max = (...values) => {
  return values.reduce((large, e) => large > e ? large : e, values[0]);
}

console.log(terser_max(2,1,2,11,9));

console.log('------');

//spread used on the calling side
const greet = (...names) => {
  console.log(names);
  console.log('hello ' + names.join(', '));
}

greet('ashik', 'michelle');
//passing them one by one

greet(['ashik', 'michelle'][0], ['ashik', 'michelle'][1]);
//passing them one by one if they were in an array

greet(...['ashik', 'michelle']);

greet (['ashik', 'michelle']); //doesn't work as intended

console.log('test ' + ['ashik', 'michelle']); //can add array and string


console.log('------');

//passing them using the spread operator
const spreadGreet = (name1, name2) => {
  console.log(`hello ${name1} ${name2}`)
}

names = ['ashik', 'michelle', 'john'];

spreadGreet(...names);

console.log('------');

//array copying, concatenation and manipulation using the spread operator
names1 = ['ashik', 'michelle'];
names2 = ['john']

console.log(names1);
console.log(names1[0], names1[1]);
console.log(...names1); //equivalent

console.log(...names1, ...names2, 'foo',); //trailing commas are okay

console.log([...names1, ...names2]);

console.log('------');

//using spread on objects
const ashik = {
  lastName: 'varghese',
  country: 'canada'
};

const AV = {...ashik};
console.log(AV);

const newAV = {...ashik, favFood: 'chicken wings'};
console.log(newAV);

const evenBetterAV = { ...newAV, operation() { console.log(`${newAV.lastName}, ${AV.country}, ${newAV.favFood}`) }};
evenBetterAV.operation();

console.log('------');

//default parameters usage
unsortedBooks = ['Harry Potter', 'Lord of the Rings', 'Gone Girl']

const sortByTitle = books => {
  let sortedBooks = books;
  return sortedBooks.sort();
}

console.log(sortByTitle(unsortedBooks));

const improvedSortByTitle = (books, ascending = true) => {
  let sortedBooks = books;
  return ascending ? sortedBooks.sort() : sortedBooks.sort().reverse();
}

console.log(improvedSortByTitle(unsortedBooks, ascending = false));

console.log('------');

const fullNameBuilder = (first = 'John', last = 'Doe') => {
  console.log(first + ' ' + last);
}

fullNameBuilder();
fullNameBuilder('Ashik', 'Varghese');
fullNameBuilder(undefined, 'Varghese'); //to skip over the first param
fullNameBuilder(null, 'Varghese'); //first param is given a value of null

console.log('------');

//expressions as default params
const taxYear = (year = new Date()) => {
  console.log(`Your tax year is ${year}`);
}

taxYear(2016);
taxYear();

console.log('------');
//default params computing values based on other params
const computeTax = (fedTax = 10, stateTax = fedTax + 5) => {
  console.log(`The federal tax is ${fedTax} and your local tax is ${stateTax}`);
}
computeTax();
computeTax(5);
computeTax(10, 20);

console.log('------');

//default param and rest operator interplay
const concatenate = (first, second = 2, ...moreValues) => {
  console.log(`First: ${first}, Second: ${second}, Rest: ${moreValues}`);
}

concatenate(1, 2, 3, 4);
concatenate(1, 3, 4); //since the rest param is last, there is no way to omit the default value

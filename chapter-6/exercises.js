//exercise 1
const salutationFor = (gender) => {
  if(gender === Symbol.for('male')) {
    return 'Mr.';
  } else {
    return 'Ms.';
  }
}

const greet = function(name, gender) {
  return `Hello, ${salutationFor(gender)} ${name}`
}

console.log(greet('Sara', Symbol.for('female')));
console.log(greet('Tom', Symbol.for('male')));

console.log('**********');

//exercise 2
const stripText = (text) => text.trim().replace(/[\t\r\n\v] +/g, ' ');

const stripMargin = (texts, ...expressions) => {
  const strippedTexts = texts.map((text) => stripText(text));
  const closingText = strippedTexts[strippedTexts.length - 1];

  const strippedExpression = expressions.map((expression, index) => {return `${strippedTexts[index]} ${expression}`});
  return `${strippedExpression} ${closingText}`;
};

const name = 'Jane';

const processed = stripMargin` This is for
  ${name.toUpperCase()} and it needs to be
    delivered by December 24th`

console.log(processed);

console.log('**********');

//exercise 3
const beforeAndAfter = function(number) {
  if(number < 0) return [];
  if(number === 0) return [1];

  return [number - 1, number + 1];
}

let before = 0;
let after = 0;

[before, after] = beforeAndAfter(7);
console.log(`${before} and ${after}`);

[before, after] = beforeAndAfter(9);
console.log(`${before} and ${after}`);

[before, after = 0] = beforeAndAfter(0);
console.log(`${before} and ${after}`);

[before = 0, after = 0] = beforeAndAfter(-1);
console.log(`${before} and ${after}`);

console.log('**********');

//exercise 4
const purchaseItems = function(essential1, essential2, ...optionals) {
  console.log(`${essential1}, ${essential2}, ${optionals.join(', ')}`);
}

const mustHaves = ['bread', 'milk'];
const also = ['eggs', 'donuts'];
const andAlso = ['juice', 'tea'];

purchaseItems(...mustHaves, ...also, ...['coffee', ...andAlso]);

console.log('**********');

//exercise 5
const getDetails = ({name, born: { year: birthYear }, graduated: { year: graduationYear }}) => {
  return `${name} born in the year ${birthYear}, graduated in ${graduationYear}`
}

const details = getDetails({
  name: 'Sara',
  born: { month: 1, day: 1, year: 2000 },
  graduated: { month: 5, day: 31, year: 2018}
});

console.log(details);
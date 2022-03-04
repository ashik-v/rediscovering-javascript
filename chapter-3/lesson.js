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
  console.log('hello ' + names.join(', '));
}

greet('ashik', 'michelle');
//passing them one by one

greet(['ashik', 'michelle'][0], ['ashik', 'michelle'][1]);
//passing them one by one if they were in an array

greet(...['ashik', 'michelle']);
//passing them using the spread operator
const foo = () => {
  let first = 1 //ASI adds a semicolon here and makes second a global variable
  second = 2;

  console.log(first);
  console.log(second);
}

foo();
console.log(second); //global variable

const bar = (number) => {
  if (number < 5){
    return number
      + 5; //legal for + to follow number so no semicolon inserted
  } else {
    return  //ASI adds a semicolon here and returns undefined
      number - 5;
  }
}

console.log(bar(1));
console.log(bar(6));

const a = 1;
const b = '1.0';
const c = '1';

console.log(a == b); //type coersion used
console.log(a == c); //type coersion used
console.log (b == c); //lexical comparison used

console.log(null == undefined);
console.log(null === undefined);

const oops = () => {
  haha = 2;
  console.log(haha); //global variable
}

oops();
console.log(haha);



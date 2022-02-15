console.log(foo); //var allows hoisting to the top of the block / function
//console.log(bar); //fails

console.log('------')

var foo = 2;
console.log(foo);
foo = 3; //overwrites foo
console.log(foo);

console.log('------')

console.log(message);

for(var i = 0; i < 3; i++){
  console.log(message);
  var message = 'round ' + i;
}
message = foo //has access to the message variable in the loop
console.log(message);

console.log('------')

let bar = 'bar';
bar = 'baz'; //global scope will always override, using var here would fail

console.log(bar)

console.log('------')

let factor = '10'

const product = (number) => {
  return number * factor
}

factor = 0; //let allows reassignment
console.log(product(10));

console.log('------')

const ashik = { age: 3, last: 'varghese' };
const greet = 'dude';

//ashik = 'foo'; //not allowed
ashik.age = 27 //allowed
greet[0] = 'r'; //silently ignored as strings are immutable

console.log(ashik);
console.log(greet);


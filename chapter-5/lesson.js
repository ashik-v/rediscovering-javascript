//named function
function sq(n) {
  return n*n;
}
console.log(sq(2));

//anonymous function stored in variable
const square = function(n) {
  return n*n
}
console.log(square(2));

//anonymous function written as an arrow function and stored in a variable
const sqr = (n) => n*n; //implicit return for one-liners
console.log(sqr(2));

//anonymous function written as an arrow function and passed as an argument vs the alternative
setTimeout(() => console.log('Hello'), 500);
setTimeout(function() { console.log('Hello')}, 500);

console.log('**********')

const greet = subject => console.log('Hello', subject);

setTimeout(greet.bind(null, 'Earthling'), 500); //how does bind work?

//lexical scoping vs dynamic scoping in the context of anonymous vs arrow functions
//lexical scoping means from the scope where the function is defined

//anonymous functions scope lexically for all non-parameter and non-variable entities except this and arguments
const someValue = 'foo';
this.stuff = 'from lexical scope'
const self =  this;
setTimeout(function() {
  console.log(this.stuff); //
  console.log(self.stuff);
  console.log(someValue);
}, 500)

//arror functions lexically scope everything
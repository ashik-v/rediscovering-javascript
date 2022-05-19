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
setTimeout(() => console.log('Hello'), 500); //reads better
setTimeout(function() { console.log('Hello')}, 500);

console.log('**********');

const greeting = subject => console.log('Hello', subject);

setTimeout(greeting.bind(null, 'Earthling'), 500); //how does bind work?

=======
setTimeout(() => console.log('Hello'), 500);
setTimeout(function() { console.log('Hello')}, 500);

console.log('**********')

const greet = subject => console.log('Hello', subject);

setTimeout(greet.bind(null, 'Earthling'), 500); //how does bind work?

//lexical scoping vs dynamic scoping in the context of anonymous vs arrow functions
//lexical scoping means from the scope where the function is defined

//anonymous functions scope lexically for all non-parameter and non-variable entities except this and arguments
const someValue = 'someValue';
this.stuff = 'from lexical scope'
const self =  this;
setTimeout(function() {
  console.log('**********');
  console.log(this.stuff); //dynamic scope
=======
const someValue = 'foo';
this.stuff = 'from lexical scope'
const self =  this;
setTimeout(function() {
  console.log(this.stuff);
  console.log(self.stuff);
  console.log(someValue);
}, 500)

//arrow functions lexically scope everything
setTimeout(() => {
  console.log('**********')
  console.log(this.stuff); //lexical scope
  console.log(self.stuff);
  console.log(someValue);
  console.log('**********');
}, 500)

//arguments dynamic vs lexical scoping
const create = function(message) {
  console.log('First argument for create: ' + arguments[0]);

  return function() {
    console.log('First argument seen by greet: ', arguments[0]);
  }
}

const greet = create('some value');
greet('foo');

const create2 = function(message) {
  console.log('First argument for create2: ' + arguments[0]);

  return () => {
    console.log('First argument seen by greet2: ', arguments[0]);
  }
}

const greet2 = create2('some value 2');
greet2('foo2');

console.log('**********');

//bind does not work with arrow functions
const logMessage = function(message, name) {
  console.log(message, name);
}

const sayHi = logMessage.bind(null, 'hi'); //the first argument binds to this which is ignored for arrow functions since they lexically scope this
sayHi('Joe');

//don't use arrow functions with call, apply or bind
console.log('**********');

// limitations
// only anonymous -> can store them in variables but that's not really naming them

const arrowFunc = (message) => {
  console.log(message);
}

arrowFunc('this works'); //but it's still an anonymous function


//can't be constructors
const Car = function(year) {
  this.year = year;
}

const car1 = new Car(2018); //this works but would not have if Car was an arrow function

console.log('**********');

const func = function() {
  if(new.target) {
    console.log('called as constructor');
  }
  else {
    console.log('called as function');
  }
}

new func();
func();

const func2 = () => {
  console.log(new.target);
}

func2(); //arrow functions lexically scope the new.target property

const outer = function() {
  return () => {
    console.log(new.target);
  }
}

foo = new outer;
bar = outer();

foo();
bar();

console.log('**********');

const returnObject = (name) => ({ firstName: name }); //need parenthesis here otherwise undefined is returned
console.log(returnObject('Ashik'));

console.log('**********');


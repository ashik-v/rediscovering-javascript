// JS does prototypal not class-based inheritence
// this uses object chain to delegate calls -> instead of relying on a base class, rely on the next object in the chain
// base class is called the objects prototype

'use strict'

class Counter {}
const counter1 = new Counter;
const counter2 = new Counter;
console.log(counter1 === counter2);
console.log(Reflect.getPrototypeOf(counter1) === Reflect.getPrototypeOf(counter2));
console.log(Reflect.getPrototypeOf(Reflect.getPrototypeOf(counter1)));
console.log(Reflect.getPrototypeOf(Reflect.getPrototypeOf(Reflect.getPrototypeOf(counter1))));

// can access a class' prototype using .prototype
console.log(Counter.prototype); // this is an empty object
Counter.prototype.count = 0; // setting a field to 0
Counter.prototype.increment = function() { this.count +=1 };
console.log(Counter.prototype); // no longer an empty object

console.log('**********');

// gets are deep
console.log(counter1.count); // goes to the prototype
console.log(counter2.count);

// sets are shallow
counter1.increment(); // calls the increment function on the prototype and 'sets' a new value to count at the instance
console.log(counter1.count);
console.log(counter1); // count from above is actually set to the instance not at the prototype level
console.log(counter2.count); // did not increment since the prototype was never updated

console.log('**********');

class Person {
  constructor(firstName, lastName) {
    console.log(`initializing Person fields`);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  toString() {
    return `Name: ${this.firstName} ${this.lastName}`;
  }

  get fullName() { return `${this.firstName} ${this.lastName}`; }

  get surname() { return `${this.lastName}`; }
}

class ReputablePerson extends Person { // use extends for prototypal inheritance in JS
  constructor(firstName, lastName, rating) {
    console.log(`initializing ReputablePerson fields`);
    super(firstName, lastName); // base class must be iniitalized before the derived class acn use 'this'
    this.rating = rating;
  }

  toString() { // overriding method
    return `${super.toString()} ${this.rating}`;
  }

  get fullName() { return `Reputed ${this.surname}, ${super.fullName}`; } // this is dynamically scoped and will search the base class for the surname method
}

const alan = new ReputablePerson('Alan', 'Turing', 5);
console.log(alan.toString());
console.log(alan.fullName); // getters do not need () since they are not really methods

console.log('**********');

const printPrototypeHeirarchy = function(instance) {
  if(instance != null) {
    console.log(instance);
    printPrototypeHeirarchy(Object.getPrototypeOf(instance));
  }
};

printPrototypeHeirarchy(alan);
console.log('**********');
ReputablePerson.prototype.foo = 'foo'; // remember that you can add new props at any time and alter the prototype chain
printPrototypeHeirarchy(alan); // any they will be captured here
console.log('**********');
delete ReputablePerson.prototype.foo; // you can delete them too
printPrototypeHeirarchy(alan); // any they will be deleted in the prototype chain
// tl;dr prototypal chain is not frozen in time like class based inheritance

console.log('**********');

// changing the prototype chain in a more drastic manner
class ComputerWiz {}
Object.setPrototypeOf(Object.getPrototypeOf(alan), ComputerWiz.prototype);
printPrototypeHeirarchy(alan);
console.log('**********');
const ada = new ReputablePerson('ada', 'lovalace', 5);
console.log('**********');
printPrototypeHeirarchy(ada); // ada also has the modified prototype chain

// default constructors do not need a specific super call
class AwesomePerson extends Person {
  get fullName() { return `Awesome ${super.fullName}`; } // the base constructor is automatically called
}

const lebron = new AwesomePerson('LeBron', 'James');
console.log(lebron);

console.log('**********');

// new extends keyword is compatible with legacy classes as well
function LegacyClass(value) {
  this.value =  value;
}

class NewClass extends LegacyClass { }

console.log(new NewClass(1));

console.log('**********');

// instance types with species
class MyString extends String {}
class MyArray extends Array {}

const concString = new MyString().concat(new MyString); // why do I need the parenthesis in front of MyString
const concArray = new MyArray().concat(new MyArray);

console.log(`instance of MyString: ${concString instanceof MyString}`); // string responds with the base class
console.log(`instance of MyArray: ${concArray instanceof MyArray}`); // while Array doesn't

console.log('**********');

// sticking to the base class
class Names {
  constructor(...names) {
    this.names = names;
  }

  filter1(selector) {
    return new Names(...this.names.filter(selector)); // why do I need to spread this.names - isn't it already an array? -> spreading is on the result of the this.names.filter
  }

  filter2(selector) {
    const constructor = Object.getPrototypeOf(this).constructor; // .constructor returns a reference to the object constructor function that created the instance, i.e. SpecializedNames in this case - why not just use this? Point of Object.getPrototypeOf?
    return new constructor(...this.names.filter(selector));
  }

  filter3(selector) {
    const constructor = this.constructor.kindHint || this.constructor;
    return new constructor(...this.names.filter(selector));
  }
}

class SpecializedNames extends Names {
  static get kindHint() {
    return Names;
  }
}

const specializedNames = new SpecializedNames('Java', 'C++', 'JavaScript');
const baseNames = new Names('Java', 'C++', 'JavaScript');
console.log(specializedNames.filter1(name => name.startsWith('Java'))); // filter1 returns a new Names object and hence sticks to the base class
console.log(baseNames.filter1(name => name.startsWith('Java')));
console.log('**********');
// choosing at runtime
console.log(specializedNames.filter2(name => name.startsWith('Java')));
console.log(baseNames.filter2(name => name.startsWith('Java')));

console.log(new alan.constructor('ashik', 'var', 5)); // one way to use the constructor method

// configuring the type
console.log(specializedNames.filter3(name => name.startsWith('Java'))); // looks at the static getter to get the class

// Symbol.species()
class MyOtherArray extends Array {
  static get [Symbol.species]() { // use Symbol.species instead of a random getter name like kindHint
    return Array;
  }
}
const otherConcArray = new MyOtherArray().concat(new MyOtherArray);
console.log(`instance of Array: ${otherConcArray instanceof Array}`);






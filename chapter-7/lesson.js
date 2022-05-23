// old way of creating classes was via functions

// new way
// console.log(Car); -> class definitions are not joisted i.e. this will error
const createTestClass = () => new TestClass;

class TestClass {};
console.log(TestClass);

createTestClass(); //although the funciton is defined before the class is, this works since the function is only called after

console.log('**********')

// constructor
console.log(Reflect.ownKeys(TestClass.prototype)); //default constuctor that every class has access to

class BasicCar {
  constructor(year) { //can define a custom constructor
    this.year = year;
  }
}
console.log(new BasicCar(2018)); //can only call constructor with the keyword new

class AdvancedCar {
  constructor(year) {
    this.year = year;
    this.miles = 0;
  }

  drive(distance) { // this is an instance method
    this.miles += distance
  }
}

console.log('**********')

//computed members (to give dynamic names to members of a class; members can be fields, methods, or)
const NYD = `New Year's Day`;

class Holidays {
  constructor() {
    this[NYD] = 'January 1';
    this["Valentine's Day"] = 'February 14';
  }

  ['list holidays']() {
    return Object.keys(this);
  }

  output() {
    return Object.keys(this); // a computed field is a 'key', this refers to the class itself in this scenario
  }
}

const usHolidays = new Holidays;
usHolidays['4th of July'] = 'July 4'; // creates a new computed field

console.log(usHolidays["Valentine's Day"]);
const methodName = 'list holidays';
console.log(usHolidays[methodName]());
console.log(usHolidays['list holidays']());
console.log(usHolidays.output());

console.log('**********')

// creating properties - similar to a field but not really

class Motorcycle {
  constructor(year) {
    this.year = year;
  }

  getAge() {
    return new Date().getFullYear() - this.year;
  }
}

const myBike = new Motorcycle(2002);
console.log(myBike.getAge());

class MotorcycleWithGetter {
  constructor(year) {
    this.year = year;
  }

  get age() { //use properties for methods that are simply reporting a vlaue or doing some basic calculation on it
    return new Date().getFullYear() - this.year;
  }
}

const anotherBike = new MotorcycleWithGetter(1998);
console.log(anotherBike.age); //calling a property

class MotorcycleWithGetterAndSetter {
  constructor(year) {
    this.year = year;
    this.miles = 0;
  }

  get age() {
    return new Date().getFullYear() - this.year;
  }

  get distanceTravelled() { return this.miles }

  set distanceTravelled(distance) { //setters can and should take exactly 1 parameter
    if (distance < this.miles) {
      throw new Error('Cannot set to less than miles already travelled')
    }
    this.miles = distance;
  }

  drive(distance) {
    this.miles += distance;
  }
}

const johnsBike = new MotorcycleWithGetterAndSetter(2000);
johnsBike.drive(1000);
console.log(johnsBike.distanceTravelled);

try {
  johnsBike.distanceTravelled = 0;
} catch { //catch can take an expression too, that will be the error message
  console.log('Whoops');
}

console.log('**********')

// adding static members
MotorcycleWithGetterAndSetter.distanceFactor = 0.01; //adding a static field
console.log(MotorcycleWithGetterAndSetter.distanceFactor);
console.log(MotorcycleWithGetterAndSetter);
console.log(Object.keys(MotorcycleWithGetterAndSetter));

class MotorcycleWithStaticMembers {
  constructor(year) {
    console.log(this); //this is the instance of the class
    this.year = year;
    this.miles = 0;
  }

  static get foo () { //defining a static getter
    console.log('hello'); //why doesn't this ever print??
    return this; //this is dynamically scoped in static members -> prints undefined
  }

  static get ageFactor() {
    return 0.1;
  }

  get age() {
    console.log('hello'); //but this does??
    console.log(this); //prints the class and it's instance's attributes/props
    return new Date().getFullYear() - this.year;
  }

  get distanceTravelled() { return this.miles }

  set distanceTravelled(distance) { //setters can and should take exactly 1 parameter
    if (distance < this.miles) {
      throw new Error('Cannot set to less than miles already travelled')
    }
    this.miles = distance;
  }

  drive(distance) {
    this.miles += distance;
  }
}

michellesBike = new MotorcycleWithStaticMembers(1998);
console.log(michellesBike.foo); //dynamic scoping of foo static member i.e does not refer to the instance of the class
console.log(michellesBike.age); //but this in this context refers to the instance of the class

console.log('**********')

//class expressions
const createClass = function(...fields) {
  return class { //this is a class expression - notce that a name is optional
    constructor(...values) {
      fields.forEach((field, index) => this[field] = values[index]);
    }
  }
}

const Actor = createClass('firstName', 'lastName', 'yearStarted'); //dynamically creating a new class
console.log(Actor); //this is an anonymous class

const bruceLee = new Actor('bruce', 'lee', 1994); // how are the fields generated - where can I see them
console.log(bruceLee.constructor.name); //no class name since this is an anonymous class
console.log(bruceLee); //comes out like an object since this class is anonymous

console.log('**********')

// names class expressions
const createNamedClass = function(...fields) {
  return class Movie {
    constructor(...values) {
      fields.forEach((field, index) => this[field] = values[index]);
    }
  }
}

const movieRating = createNamedClass('year', 'rating'); //dynamically creating a new class based on this template
console.log(movieRating); //named class expression

const rushHour = new movieRating('1994', 3);
console.log(rushHour); // does not come out in JSON since a class name is known

try {
  console.log(Movie); //careful as we actually do not have access to Movie
} catch(ex) {
  console.log(ex.message);
}

console.log('**********')

// Set, Map, WeakSet, WeakMap - new built-in classes
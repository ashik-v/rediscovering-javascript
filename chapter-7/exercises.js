'use strict'
// exercise 1
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.numberOfPages = pages;
  }

  get pages() {
    return this.numberOfPages;
  }
}
const book = new Book('Who Moved My Cheese?', 'Spencer Johnson', 96);
console.log(book.title);
console.log(book.pages);

try {
  book.pages = 96;
} catch(ex) {
  console.log(ex.message);
}

console.log('**********');

// exercise 2
class Tax {
  static forAmount(value) {
    return value * Tax.stateRate;
  }
}

Tax.stateRate = 0.08;

console.log(Tax.stateRate);
console.log(Tax.forAmount(100));

const forAmount = Tax.forAmount;
this.stateRate = 0.01;
console.log(forAmount.call(this, 100));

console.log('**********');

// exercise 3
class Todo {
  constructor() {
    this['learn javascript'] = 'done';
    this['write elegant code'] = 'work-in-progress';
    this['automate tests'] = 'work-in-progress';
  }

  completedCount() {
    return Object
      .keys(this)
      .filter((key) => this[key] === 'done');
  }
}
const todo = new Todo();
console.log(todo['learn javascript']);
console.log(todo['write elegant code']);
console.log(todo['automate tests']);
console.log(todo.completedCount());

console.log('**********');

// exercise 4
const create = (sportsArray) => {
  return new Set(sportsArray.map((sport) => sport.toUpperCase()));
}

const toLowerCase = (sportsSet) => {
  const sports = sportsSet.keys();
  const lowerCaseSportsArray = [...sports].map((sport) => sport.toLowerCase());
  return new Set(lowerCaseSportsArray);

}

const sports = create(['Soccer', 'Football', 'Cricket', 'Tennis', 'soccer']);

console.log(sports.has('FOOTBALL'));
console.log(sports.has('Football'));
console.log(sports.size);

const inLowerCase = toLowerCase(sports);
console.log(inLowerCase.has('football'));
console.log(inLowerCase.size);

function first() {
  for(i = 0; i < 5; i++) {
    second();
  }
}

function second() {
  for(i = 0; i < 3; i++) {
    console.log(i);
  }
}

second();

const person = Object.freeze(
  { name: 'John Doe',
  address: { street: '101 Main St.', city: 'New York' }
});

person.address.street = '102 Main St.'
console.log(person); //freeze does not protect agast deep changes

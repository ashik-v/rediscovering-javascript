//for...of
const names = ['ashik', 11, 'john', 'subash', 'mini'];
for(const name of names) {
  //name = 'foo'; // name is an immutable constant so this will fail
  console.log(typeof name)
  console.log(name); // name has block scope
}

console.log('**********');

//object.entries
console.log(names.entries()); //returns an iterator
for (const name of names.entries()) {
  console.log(name);
}
// but what if you want access to the index too
for (const [i, name] of names.entries()) { // destructuring
  console.log(`index ${i}: name: ${name}`);
}

console.log('**********');
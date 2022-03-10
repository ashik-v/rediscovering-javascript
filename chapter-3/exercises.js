//exercise 1
const amountAfterTaxes = (amount, fedTax = 0, stateTax = 0, localTax = 0 ) => {
  return (amount * ( 1 + (fedTax + stateTax + localTax) / 100 )).toFixed(2);
}

const amount = 25.12;
const fedTax = 10;
const stateTax = 2;
const localTax = 0.5;

console.log(amountAfterTaxes(amount));
console.log(amountAfterTaxes(amount, fedTax));
console.log(amountAfterTaxes(amount, fedTax, stateTax));
console.log(amountAfterTaxes(amount, fedTax, stateTax, localTax));

//exercise 2
const purchaseItems = (essential1 = 'milk', essential2 = 'bread', ...optionals) => {
  console.log(essential1 + ', ' + essential2 + ', ' + optionals.join(', '));
}

purchaseItems('bread', 'milk');
purchaseItems('bread', 'milk', 'jelly');

const mustHaves = ['bread', 'milk'];
const andAlso = ['eggs', 'donuts', 'tea'];

purchaseItems(...mustHaves, ...andAlso);

//exercise 3
const items = ['cheese', 'milk'];
purchaseItems('cheese');
purchaseItems(...items);
purchaseItems();

//exercise 4
const placeOrder = (id, amount, shipping = amount < 20 ? 5 : 10, date = new Date) => {
  console.log(' shipping charge for id: ' + id + ' is $' + shipping + ' Date: ' + date.getDate());
}

placeOrder(1, 12.10, 3, new Date('05/15/2018'));
placeOrder(1 , 25.20, 10);
placeOrder(1, 12.05);
placeOrder(1, 25.30);
placeOrder(1, 25.20);

//exercise 5
placeOrder(1, 40, undefined, new Date('02/02/2022'))

//scrap
array = [1, 2, 3];
console.log(array);
console.log('array ' + array.join(', '));
console.log('array ' + [array].join(', '));
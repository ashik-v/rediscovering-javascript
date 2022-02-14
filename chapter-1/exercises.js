const foo = () => {
  return 2
    * 3;
}

const bar = () => {
  return '2.0' / 2 * '2.0' === 2 / 2 * 2
}

console.log(foo());
console.log(bar());

const canVote = (age) => {
  if (age == 18){
    return 'yay, start voting';
  } else if (age < 18){
    return 'no, can\'t vote';
  } else {
    return 'please vote';
  }
}

console.log(canVote(12));
console.log(canVote('12')); //implicit type conversion
console.log(canVote(17));
console.log(canVote('@18'));
console.log(canVote(18));
console.log(canVote(28));

var isPrime = function(n){
  for(let i = 2; i < n; i++){ //use let here
    if (n % i == 0) return false;
  }
  return n > 1;
}

var sumOfPrimes = function(n) {
  var sum = 0;
  for(let i = 1; i <= n; i++) { //use let here
    if(isPrime(i)) sum += i;
  }
  return sum;
}

console.log(sumOfPrimes(10));

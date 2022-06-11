// callback functions are functions that are passed to other functions so that they can be called after the other function has executed
const greet = (name, callback) => {
  console.log(`Hello, ${name}`);
  callback();
}

const callMe = () => {
  console.log(`hello from the callback function!`);
  console.log('**********');
}

greet('Ashik', callMe); // basic callback with callMe

function saveSomething(data, afterSave) {
  console.log('**********');
  console.log(`${data} saving`);
  afterSave();
}

function afterSave() {
  console.log('Success!');
  console.log('**********');
}

setTimeout(saveSomething, 2000, 'song', afterSave); // afterSave is the callback in this case

// creating a promise
const newPromise = new Promise((resolve, reject) => {
  if(true) {
    resolve('Promise delivered!');
  } else {
    reject('Promise failed!')
  }
});

// using a promise
newPromise
  .then((successMessage) => { console.log(successMessage)})
  .catch((errorMessage) => { console.log(errorMessage)});

// return a promise instead of taking a callback
const computeSqrtAsync = function(number) {
  if (number < 0 ) {
    return Promise.reject('no negative numbers please');
  }

  if (number === 0) {
    return Promise.resolve(0);
  }

  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(Math.sqrt(number)), 1000);
  });
};

const forNegative1 = computeSqrtAsync(-1);
const forZero = computeSqrtAsync(0);
const forSixteen = computeSqrtAsync(4);

console.log(forNegative1);
console.log(forZero);
console.log(forSixteen);

const reportOnPromise = function(promise) {
  promise
    .then(result => console.log(`Result is ${result}`))
    .catch(error => console.log(`Error is ${error}`));
};


reportOnPromise(forNegative1);
reportOnPromise(forZero);
reportOnPromise(forSixteen);

// sync vs async code
function sayHello() {
  console.log('Hi A');
  setTimeout(() => { console.log('Hi B') }, 0);
  console.log('Hi C');
}

sayHello(); // should be A, B C if it was sync but we get acb because of the async setTimeout function

// chaining promises
const firstPromise = new Promise((resolve, reject) => {
  if(true) {
    resolve('FIRST PROMISE DELIVERED');
  } else {
    reject('FIRST PROMISE FAILED');
  }
});

const secondPromise = new Promise((resolve, reject) => {
  if(false) {
    resolve('SECOND PROMISE DELIVERED');
  } else {
    reject('SECOND PROMISE FAILED');
  }
});

const thirdPromise = new Promise((resolve, reject) => {
  if(true) {
    resolve('THIRD PROMISE DELIVERED');
  } else {
    reject('THIRD PROMISE FAILED');
  }
});

firstPromise
  .then((successMessage) => {
    console.log(successMessage);
    secondPromise
      .then((successMessage) => {
        console.log(successMessage);
        thirdPromise
          .then((successMessage) => { console.log(successMessage) })
          .catch((errorMessage) => { console.log(errorMessage) });
      })
      .catch((errorMessage) => { console.log(errorMessage) });
  })
  .catch((errorMessage) => { console.log(errorMessage) });

// racing promises
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'two')
})

Promise
  .race([promise1, promise2])
  .then((value) => { console.log(value) })
  .catch((value) => { console.log(value) }) // two is returned since it was delivered first

// gathering all promises
const promise = Promise.resolve('42');
const anotherPromise = Promise.resolve('24');
const andAnotherOne = '?';

Promise
  .all([promise, anotherPromise, andAnotherOne])
  .then((values) => {
    console.log(values);
  })
  .catch((values) => {
    console.log(values);
  });

// async await
const computeSync = function(number) {
  if(number < 0) {
    throw new Error('no negative, please');
  }

  return number * 2;
};

const computeAsync = function(number) {
  if(number < 0) {
    return Promise.reject('no negative, please');
  }
  return Promise.resolve(number * 2);
};

const callComputeSync = function(number) {
  try {
    console.log(computeSync(number));
  } catch(ex) {
    console.log(ex.message);
  }
}

const callComputeAsync = function(number) {
  computeAsync(number)
    .then((value) => { console.log(value) })
    .catch((value) => { console.log(value) });
}

callComputeSync(6);
callComputeSync(-1);

callComputeAsync(10);
callComputeAsync(-5);

const callComputeWithAsyncAwait = async function(number) {
  try {
    const result = await computeAsync(number);
    console.log(`Result is ${result}`);
  } catch(ex) {
    console.log(ex);
  }
}

callComputeWithAsyncAwait(50);
callComputeWithAsyncAwait(-10);
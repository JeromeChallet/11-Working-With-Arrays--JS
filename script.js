'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
// contains all the movements to been seen in teh DOM
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////CREATING DOM ELEMENTS/////////////////////
// receives the data with which it should actually work
// receives one array of movement and works with that data
const displayMovements = function (movements) {
  // innerHTML is similar to text content here
  // .textContent = 0
  // but innerHTML returns everything including the tags
  containerMovements.innerHTML = '';
  //console.log(containerMovements.innerHTML);

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;
    // inserts a string of HTML and insert it into HTML DOM
    // afterbegin inserts the new child element right after the begining of the element
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
// Calculate and Display the balance
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter(mov => mov < 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + mov, 0);
  labelSumInterest.textContent = `${incomes}€`;
};
calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(account1.movements);

/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////////CHAINING METHOD/////////////////////////
// chains methdod one after another
// take all teh movements deposit and covnert them from EUR to USD and add them all up
// it is bad practice to mutate the original array when chaining
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // we can inspect the current array at any stage of the pipeline using the 3rd paramter or the callback function
  .map((mov, i, arr) => {
    //console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

////////////////////////THE REDUCE METHOD/////////////////////////
// resutls in the global balance of the account
// acc is the accumulator, it's a snowball that keeps accumulating the value that we want to return
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}:${acc}`);
//   return acc + cur;
// }, 0); // that 0 is the starting value

// same as above but arrow function
const balance = movements.reduce((acc, cur) => acc + cur, 0); // that 0 is the starting value

// same as above, we always need and external variable whenever we use a for loop
let balance2 = 0;
for (const mov of movements) sum += mov;
console.log(balance2);

//Maximum Value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

////////////////////////THE FILTER METHOD/////////////////////////
// filter for elements using a callback function
// create an array of the deposits filtering out the negative values
const deposits = movements.filter(function (mov) {
  //this is the filtering condition
  return mov > 0;
});
console.log(movements); // shows all elements
console.log(deposits); // shows only positive elements

// same as above
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// challenge shows only the negative numbers
const withdrawals = movements.filter(mov => mov < 0);

////////////////////////FOR EACH WITH MAPS AND SETS/////////////////////////
// in this case we use for Each the same way as on an array
//map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// the thng is key and map are the same but it was kept this way for consistency
// so we put the throwaway variable _ instead of key
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

////////////////////////LOOPING ARRAYS FOR EACH/////////////////////////
// loops over th and execute the callback function at each iteration
// it also passes the current element of the array as an argument
// for each element of th array, apply the callback function
// there is no break statment meaning it must go until the end
// movements.forEach(function(mov, i, arr){
//   if (mov > 0){
//     console.log(`Movement ${i+1} u depositied ${mov}`);
//   }else{
//     console.log(`Movement ${i+1} u withdrew ${Math.abs(mov)}`);
//   }
// }

////////////////////////SIMPLE ARRAY METHODS/////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// //return a copy of the array but only the extracted parts
// arr.slice(2);
// arr.slice(2, 4);
// // takes the last 2 elements of the array
// arr.slice(-2);
// // takes from 1 except the last 2
// arr.slice(1, -2);
// // make a shallow copy
// arr.slice();

// //SPLICE
// // works like slice but changes the original array
// // splice is most ussefull for removing elements from an array
// arr.splice(2);
// arr.splice(2, 4);
// // takes the last 2 elements of the array
// arr.splice(-2);
// // takes from 1 except the last 2
// arr.splice(1, -2);
// // make a shallow copy
// arr.splice();

// // REVERSE
// // mutates the original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// arr2.reverse();

// // CONCAT
// // cocatanate the arrays but does not mutate the original array
// arr.concat(arr2);
// // same as
// [...arr, ...arr2];

// // JOIN
// // joins the elements of an array a certain way
// // here we add - between each elements
// arr.join(' - ');

////////////////////////THE NEW AT METHOD/////////////////////////
// const arr = [23, 11, 64];
// // specifies the index position of an array
// // it is good for method chaining
// arr[0];
// arr.at(0);
// arr.at(-1); // last element of the array

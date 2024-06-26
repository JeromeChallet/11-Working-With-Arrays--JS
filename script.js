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
const displayMovements = function (movements, sort = false) {
  // innerHTML is similar to text content here
  // .textContent = 0
  // but innerHTML returns everything including the tags
  containerMovements.innerHTML = '';
  //console.log(containerMovements.innerHTML);

  // if sort is true then sort the movements values
  // we sue slice to make sure we do not mutate the original array
  // if the movemetns values are out of order we sort them if not then jsut movements given back
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

// Calculate and Display the balance
const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov < 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + mov, 0);
  labelSumInterest.textContent = `${incomes}€`;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(currentAccount);
  // Display summary
  calcDisplaySummary(currentAccount);
};

/////////////////////LOGIN METHOD/////////////////////
// event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();
  currentAccount = account.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.computedStyleMap.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // update UI
    updateUI(currentAccount);
  }
});

/////////////////////SOME AND EVERY METHOD/////////////////////
// some method
// it's like conditional if else statement
const anyDeposits = movements.some(mov => mov > 0);

btnLoan.addEventListener('click', function (e) {
  e.preventDefault;

  const amount = Number(inputLoanAmount.value);

  // loan is given if the curren account amount has at least 10% of the asked amount
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    // add movement
    currentAccount.movements.push(amount);
    // update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// every method
// returns true only is all teh elements in the array satisfy the condition
console.log(movements.every(mov => mov > 0));

// separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(movements.filter(deposit)); // array that satisfy the condition

/////////////////////FLAT & FLATMAP/////////////////////
// flattens the arrays into one but only goes one level deep
const arr2 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr2.flat()); // [1,2,3,4,5,6,7,8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // [1,2,3,4,5,6,7,8]

// new array for all the accounts that only contains the movements array
//const accountMovements = accounts.map(acc => acc.movements);
//const allMovements = accountMovements.flat();
// add up all the values from all the allMovements
//const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

// flat map combines the flat and map method at the same time
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

/////////////////////FINDINDEX METHOD/////////////////////
// returns the index of found element and not the element itself
// to delete an element with the splice method we need to know its position first using findIndex
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // with indexOf we can only search for the value that is in the array
    // with indexOf we can create a complex if condition
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // delete account
    accounts.splice(index, 1);

    // hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

/////////////////////IMPLEMENTING TRANSFERS/////////////////////
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveerAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiveerAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements, push(-amount);
    receiveerAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

/////////////////////THE FIND METHOD/////////////////////
// returns one element of an array based on a condition
// it returns the original element not an array
const firstWithdrawal = movements.find(mov => mov < 0);

const account = accounts.find(acc => acc.owner === 'Jessiace Davis');

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

/////////////////////SORTING ARRAY/////////////////////
// mutates the original array
const owners = ['jerome', 'john', 'smith', 'sam'];
console.log(owners.sort()); // sorts the order from a to z

// automatically converts to string then do the sorting
// to fix this we use a compare callback function into the method
console.log(movements);
// if return < 0, a before b (keep order)
// if return > 0, b before a (switch order)
// movements.sort((a, b) => {
//   if (a > b) return 1;
// if a < b then we want to return something negative therefore a - b is the same
//   if (a < b) return -1;
// });
//  same as above
movements.sort((a, b) => a - b);
console.log(movements); // assending order

/////////////////////CREATING AND FILLING ARRAYS/////////////////////
// define an array programatically
// creates an array with 7 empty elements in them but we cant use the map method
const arr = [1, 2, 3, 4, 5, 6, 7];
const x = new Array(7);
// same as above but we can use maps
x.map(() => 5);

// fill
// mutates the original array
// assigns the value of 1 to each element in the array from the index 3
x.fill(1, 3, 5);

arr.fill(23, 4, 6);

// Array.from
// from allows u to recreate an array programmatically
// from() is not a mehtod used on the array but we on the array constructor
// first pass an object with a length property thena callback function
const y = Array.from({ length: 7 }, () => 1);

// _ is a throwaway variable
const z = Array.from({ length: 7 }, (_, i) => i + 1);

// 100 random dice roll
const d = Array.from(
  { length: 100 },
  (_, i) => i + (Math.floor(Math.random() * 6) + 1)
);

// strings maps or sets are called iterables that can be converted to real arrays using Array.from
// we can create arrays from out of things

// querySelectorAll() returns a node list
// in order to be able to use array methods on a node list we must first convert it to an array

labelBalance.addEventListener('click', function () {
  // now that movementsUI is a real array we can use the map method
  const movementsUI = Array.from(
    document.querySelectorAll('.movements_value'),
    el => Number(el.textContent.replace('€', ''))
  );
});

/////////////////////ARRAY METHOD PRACTICE/////////////////////
// sum of all the deposited amount with one big array
const bankDepositSum = accounts
  .flatMap((acc = acc.movements))
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum * cur, 0);

// how many deposit of at least 1000$
const numDeposits1000 = accounts
  // .flatMap(acc => acc.movements)
  // .filter(mov => mov >= 1000).length;
  .flatMap(acc => acc.movements)
  // .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

  // prefix operator ++
  let a = 10;
  console.log(++0); //11
console.log(a); // 11
  
// create an obj containing the sum of the deposits and withdrawal
const sums = accounts.flatMap(acc => acc.movements).reduce((sums, cur) => {
  //cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
  sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
  return sums;
}, {deposits: 0, withdrawals:0})

// func to convert any string to a title case
const convertTitleCase = function (title) {
const capitalize = str =>  str[0].toUpperCase()+word.slice(1)

  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title.toLowerCase().split(' ').map(word=> exceptions.includes(word) ? word : capitalize(word));
  return capitalize(titleCase);
}
/* * Exercise 01 - Coins * */

// Add your function here
const MAX_AMOUNT = 100;

const COINS = [
  { name: 'dollars', cents: 100 },
  { name: 'quarters', cents: 25 },
  { name: 'dimes', cents: 10 },
  { name: 'nickels', cents: 5 },
  { name: 'pennies', cents: 1 },
];

const calculateChange = function calculateChange(input) {
  if (!Number.isFinite(input)) {
    return 'Error: this is not a number';
  }

  if (input > MAX_AMOUNT) {
    return 'Error: the number is too large';
  }

  if (input < 0) {
    return 'Error: the number cannot be negative';
  }

  let remainder = Math.round(input * 100);
  const change = {};

  COINS.forEach(({ name, cents }) => {
    change[name] = Math.floor(remainder / cents);
    remainder %= cents;
  });

  return change;
};
// Sample test cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(150.11));
// $150.11 ==> Error: the number is too large
// Add additional test cases here
console.log(calculateChange(100));
// $100 ==> 100 dollars
console.log(calculateChange(0.03));
// $0.03 ==> 3 pennies
console.log(calculateChange(0.01));
// $0.01 ==> 1 penny
console.log(calculateChange(0));
// $0.00 ==> 0
console.log(calculateChange('No Change'));
// 'No Change' ==> Error: this is not a number
console.log(calculateChange('0.01'));
// '0.01' ==> Error: this is not a number
console.log(calculateChange(-1));
// '-1.00' ==> Error: Error: the number cannot be negative
function checkPrime(numbersList) {
  let primesList = [];
  for (let number of numbersList) {
    var isPrime = true;
    for (let i = 2; i < number; i++) {
      if (number % i == 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primesList.push(number);
    }
  }
  return primesList;
}
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 14, 15];
console.log(checkPrime(numbers));
console.log(checkPrime2(numbers));

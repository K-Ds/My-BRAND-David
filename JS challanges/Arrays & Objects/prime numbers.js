function checkPrime1(numbersList) {
  let primesList = numbersList.filter((number) => {
    for (let i = 2; i < number; i++) {
      if (number % i == 0) {
        return false;
      }
    }
    return true;
  });
  return primesList;
}

console.log(checkPrime(numbers));

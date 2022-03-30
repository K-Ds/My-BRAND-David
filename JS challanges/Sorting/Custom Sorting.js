function checkPrime(number) {
  let isPrime = true;
  for (let i = 2; i < number; i++) {
    if (number % i == 0) {
      isPrime = false;
      break;
    }
  }
  return isPrime;
}

function sortCheck(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i]) && checkPrime(arr[i])) {
      arr.splice(i, 1);
      i--;
    } else if (isNaN(arr[i])) {
      console.log(arr[i]);
      arr[i] = arr[i].toLowerCase();
      console.log(arr[i]);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    let maxTemp = arr[i];

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > maxTemp) {
        maxTemp = arr[j];
        arr[j] = arr[i];
        arr[i] = maxTemp;
      }
    }
  }

  return arr;
}

console.log(sortCheck(["mosh", "david", 3, "Zable", 4, 7]));

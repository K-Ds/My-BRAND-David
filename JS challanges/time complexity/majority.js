function majorityCount(arr) {
  const halfOfArr = Math.floor(arr.length / 2);
  let numCount = {};
  for (let num of arr) {
    if (!numCount.hasOwnProperty(num)) {
      numCount[num] = 0;
    }
    numCount[num]++;
    if (numCount[num] > halfOfArr) {
      return numCount[num];
    }
  }

  return false;
}

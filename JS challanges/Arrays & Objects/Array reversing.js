function reverseArray(array) {
  let arr = [...array];
  let reversedArr = [];
  let arrLength = array.length;

  for (let i = 0; i < arrLength; i++) {
    reversedArr.push(arr.pop());
  }

  return reversedArr;
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(reverseArray(arr));
console.log(arr);

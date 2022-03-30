function reverseArray(array) {
  for (let i = 0; i < array.length; i++) {
    let arrLength = array.length - 1;
    let limit = Math.floor(arrLength / 2);
    while (i <= limit) {
      let temp = array[i];
      array[i] = array[arrLength - i];
      array[arrLength - i] = temp;
      break;
    }
  }

  return;
}

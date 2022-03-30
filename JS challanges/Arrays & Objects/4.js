function formatArray(arr) {
  let obj = {};
  for (let entry of arr) {
    let entrySplit = entry.split(", ");
    names = entrySplit[0].split(" ");
    age = entrySplit[1];

    obj[names[0]] = { "second-name": names[1], age: age };
  }

  return obj;
}

let namesArr = [
  "Patrick wyne, 30",
  "lil wyne, 32",
  "Eric mimi, 21",
  "Dodos deck, 21",
  "Alian Dwine, 22",
  "Patrick wyne, 33",
  "Patrick wyne, 100",
  "Patrick wyne, 40",
];

console.log(formatArray(namesArr));

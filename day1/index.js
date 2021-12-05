const { getInput } = require("../util");

const input = getInput(__dirname);

const measurements = input.map(Number);

function part1() {
  let increases = 0;
  let prev = Infinity;
  for (let current of measurements) {
    if (current > prev) increases++;
    prev = current;
  }
  return increases;
}

function part2() {
  let increases = 0;
  let prev = Infinity;
  for (let i = 0; i <= measurements.length - 2; i += 1) {
    const item1 = measurements[i];
    const item2 = measurements[i + 1];
    const item3 = measurements[i + 2];
    const total = item1 + item2 + item3;
    if (total > prev) increases++;
    prev = total;
  }
  return increases;
}

console.log(part1(input), part2(input));

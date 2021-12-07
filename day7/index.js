const { getInput, median, sum, range } = require("../util");

const input = getInput(__dirname)[0].split(",").map(Number);
// const input = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

const inc = (total) => sum(range(1, total + 1));

function part1(input) {
  const a = median(input);
  return sum(input.map((n) => Math.abs(n - a)));
}

function part2(input) {
  const a = Math.floor(sum(input) / input.length);
  return sum(
    input.map((n) => {
      const d = Math.abs(n - a);
      return inc(d);
    })
  );
}

console.log(part1(input), part2(input));

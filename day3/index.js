const { getInput } = require("../util");

const input = getInput(__dirname);

function getColumns(input) {
  const length = input[0].length;
  const chars = [];
  for (let i = 0; i < length; i++) {
    chars[i] = input.map((row) => row[i]);
  }
  return chars;
}

const getMostCommon = (items) => {
  const zeros = items.filter((char) => char === "0").length;
  const ones = items.length - zeros;
  return zeros > ones ? "0" : "1";
};

const traverse = (items, i, fn) => {
  const count = countInColumn(items, i);
  const target = fn(...count);
  let filtered = items.filter((row) => row[i] === target);
  if (filtered.length === 1) return filtered[0];
  return traverse(filtered, ++i, fn);
};

const countInColumn = (items, col) => {
  const chars = items.map((row) => row[col]);
  const zeros = chars.filter((char) => char === "0").length;
  const ones = items.length - zeros;
  return [zeros, ones];
};

const genMatch = (zeros, ones) => {
  if (zeros === ones) return "1";
  return zeros > ones ? "0" : "1";
};

const scrubMatch = (zeros, ones) => {
  if (zeros === ones) return "0";
  return zeros > ones ? "1" : "0";
};

function part1(input) {
  const columns = getColumns(input);
  const gamma = columns.map(getMostCommon).join("");
  const epsilon = gamma
    .split("")
    .map((char) => (char === "1" ? "0" : "1"))
    .join("");

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function part2(input) {
  let generatorRating = traverse(input, 0, genMatch);
  let scrubberRating = traverse(input, 0, scrubMatch);

  return parseInt(generatorRating, 2) * parseInt(scrubberRating, 2);
}

console.log(part1(input), part2(input));

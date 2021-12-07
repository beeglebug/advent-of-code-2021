const fs = require("fs");
const path = require("path");

exports.getInput = (dir) => {
  return fs
    .readFileSync(path.resolve(dir + "/input.txt"), "utf8")
    .toString()
    .split("\n");
};

exports.sum = (arr) => arr.reduce((total, num) => total + num, 0);

exports.arr = (size, fill = 0) => new Array(size).fill(0);

exports.range = (start, end) =>
  new Array(end - start).fill().map((_, i) => i + start);

exports.median = (numbers) => {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) return (sorted[middle - 1] + sorted[middle]) / 2;
  return sorted[middle];
};

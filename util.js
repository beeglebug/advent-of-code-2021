const fs = require("fs");
const path = require("path");

exports.getInput = (dir) => {
  return fs
    .readFileSync(path.resolve(dir + "/input.txt"), "utf8")
    .toString()
    .split("\n");
};

exports.sum = (arr) => arr.reduce((total, num) => total + num);

exports.arr = (size) => new Array(size).fill(0);

const fs = require("fs");
const path = require("path");

exports.getInput = (dir) => {
  return fs
    .readFileSync(path.resolve(dir + "/input.txt"), "utf8")
    .toString()
    .split("\n");
};

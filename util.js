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

exports.createGraph = (arr) => {
  const height = arr.length;
  const width = arr[0].length;
  const graph = { width, height, data: [] };

  for (let y = 0; y < height; y++) {
    graph.data[y] = [];
    for (let x = 0; x < width; x++) {
      const value = arr[y][x];
      graph.data[y][x] = { x, y, value };
    }
  }

  return graph;
};

exports.getNeighbours = (map, x, y, diagonal = false) => {
  const neighbours = [];

  // left
  if (x > 0) neighbours.push(map.data[y][x - 1]);

  // right
  if (x < map.width - 1) neighbours.push(map.data[y][x + 1]);

  // above
  if (y > 0) {
    neighbours.push(map.data[y - 1][x]);
    if (diagonal) {
      if (x > 0) neighbours.push(map.data[y - 1][x - 1]);
      if (x < map.width - 1) neighbours.push(map.data[y - 1][x + 1]);
    }
  }

  // below
  if (y < map.height - 1) {
    neighbours.push(map.data[y + 1][x]);
    if (diagonal) {
      if (x > 0) neighbours.push(map.data[y + 1][x - 1]);
      if (x < map.width - 1) neighbours.push(map.data[y + 1][x + 1]);
    }
  }

  return neighbours;
};

const { getInput, sum } = require("../util");

const input = getInput(__dirname).map((row) => row.split("").map(Number));
const width = 100;
const height = 100;

function createGraph(input) {
  const graph = { width, height, data: [] };
  for (let y = 0; y < height; y++) {
    graph.data[y] = [];
    for (let x = 0; x < width; x++) {
      const value = input[y][x];
      graph.data[y][x] = { x, y, value };
    }
  }
  return graph;
}

function getNeighbours(map, x, y) {
  const neighbours = [];
  if (x > 0) neighbours.push(map.data[y][x - 1]);
  if (x < width - 1) neighbours.push(map.data[y][x + 1]);
  if (y > 0) neighbours.push(map.data[y - 1][x]);
  if (y < height - 1) neighbours.push(map.data[y + 1][x]);
  return neighbours;
}

function part1(input) {
  const graph = createGraph(input);
  const low = [];
  for (let y = 0; y < graph.height; y++) {
    for (let x = 0; x < graph.width; x++) {
      const point = graph.data[y][x];
      const neighbours = getNeighbours(graph, x, y);
      if (neighbours.every((n) => point.value < n.value)) {
        low.push(point.value + 1);
      }
    }
  }
  return sum(low);
}

function part2(input) {}

console.log(part1(input), part2(input));

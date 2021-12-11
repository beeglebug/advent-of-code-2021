const { getInput, createGraph, getNeighbours, times } = require("../util");

const input = getInput(__dirname).map((row) => row.split(""));

const iterate = (graph, fn) => {
  for (let y = 0; y < graph.height; y++) {
    for (let x = 0; x < graph.width; x++) {
      const cell = graph.data[y][x];
      fn(cell);
    }
  }
};

const output = (graph) =>
  graph.data.map((row) => row.map((i) => i.value).join("")).join("\n");

function step(graph) {
  const queue = [];
  const increment = (item) => {
    if (++item.value > 9) queue.push(item);
  };

  // initial state and queue
  iterate(graph, (item) => {
    item.hasFlashed = false;
    increment(item);
  });

  while (queue.length) {
    const current = queue.shift();
    if (current.hasFlashed) continue;
    current.hasFlashed = true;
    graph.flashes++;
    const neighbours = getNeighbours(graph, current.x, current.y, true);
    neighbours.forEach(increment);
  }

  // reset
  iterate(graph, (item) => {
    if (item.hasFlashed) item.value = 0;
  });
}

function part1(input) {
  const graph = createGraph(input);
  graph.flashes = 0;
  for (let i = 0; i < 100; i++) {
    step(graph);
  }
  return graph.flashes;
}

function part2(input) {
  const graph = createGraph(input);
  let i = 0;
  while (true) {
    step(graph);
    i++;
    if (graph.data.flat().every((item) => item.value === 0)) {
      return i;
    }
  }
}

const test = [
  "5483143223",
  "2745854711",
  "5264556173",
  "6141336146",
  "6357385478",
  "4167524645",
  "2176841721",
  "6882881134",
  "4846848554",
  "5283751526",
].map((row) => row.split(""));

console.log(part1(input));
console.log(part2(input));

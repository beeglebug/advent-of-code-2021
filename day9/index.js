const { getInput, sum, createGraph, getNeighbours, run } = require("../util");

const input = getInput(__dirname).map((row) => row.split("").map(Number));

const isOpen = (node) => node.value !== 9 && node.id === undefined;

const step = (graph, id) => {
  const start = graph.data.flat().find(isOpen);
  if (start === undefined) return false;
  const queue = [start];
  while (queue.length) {
    const current = queue.shift();
    current.id = id;
    const neighbours = getNeighbours(graph, current.x, current.y);
    const connected = neighbours.filter(isOpen);
    queue.push(...connected);
  }
  return true;
};

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

function part2(input) {
  const graph = createGraph(input);
  let id = 0;
  while (true) {
    const foundIsland = step(graph, id++);
    if (foundIsland === false) break;
  }
  return Object.values(
    graph.data.flat().reduce((byId, node) => {
      if (node.id !== undefined) byId[node.id] = (byId[node.id] || 0) + 1;
      return byId;
    }, {})
  )
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((a, b) => a * b);
}

// run("part 1", part1, input);
run("part 2", part2, input);

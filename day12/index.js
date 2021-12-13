const { getInput, run } = require("../util");

const input = getInput(__dirname).map((r) => r.split("-"));

const buildGraph = (input) => {
  const nodes = {};
  const build = (a, b) => {
    nodes[a] = nodes[a] || { id: a, connections: [] };
    nodes[a].connections.push(b);
  };
  input.forEach(([from, to]) => {
    build(from, to);
    build(to, from);
  });
  return nodes;
};

const complete = (path) =>
  path[0] === "start" && path[path.length - 1] === "end";

const isUpperCase = (str) => str === str.toUpperCase();

const hasNoDoubleSmalls = (nodes) => {
  const lower = nodes.filter((node) => !isUpperCase(node));
  return new Set(lower).size === lower.length;
};

function traverse(graph, validityCheckFn) {
  const paths = [];
  const queue = [...graph.start.connections.map((node) => ["start", node])];
  while (queue.length) {
    const current = queue.shift();
    const tail = current[current.length - 1];
    const next = graph[tail].connections.filter((node) =>
      validityCheckFn(node, current)
    );
    next.forEach((node) => {
      const path = [...current, node];
      if (complete(path)) {
        paths.push(path);
      } else {
        queue.push(path);
      }
    });
  }
  return paths.length;
}

function part1(input) {
  const graph = buildGraph(input);
  return traverse(graph, (node, current) => {
    return isUpperCase(node) || !current.includes(node);
  });
}

function part2(input) {
  const graph = buildGraph(input);
  return traverse(graph, (node, current) => {
    if (node === "start") return false;
    if (isUpperCase(node)) return true;
    if (hasNoDoubleSmalls(current)) return true;
    return !current.includes(node);
  });
}

run("Part 1", part1, input);
run("Part 2", part2, input);

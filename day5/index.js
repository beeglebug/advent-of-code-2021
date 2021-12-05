const { getInput } = require("../util");

// prettier-ignore
const lines = getInput(__dirname)
  .map((row) => row.replace(" -> ", ",").split(",").map(Number))
  .map(([x1, y1, x2, y2]) => [
    x1, y1, x2, y2,
    Math.sign(x2 - x1),
    Math.sign(y2 - y1),
  ]);

const arr = (size) => new Array(size).fill(0);
const count = (grid) => grid.filter((i) => i > 1).length;

const traverse = (grid, x1, y1, x2, y2, sx, sy) => {
  while (true) {
    grid[x1 + 999 * y1]++;
    if (x1 === x2 && y1 === y2) break;
    x1 += sx;
    y1 += sy;
  }
};

function part1(lines) {
  const grid = arr(999 * 999);
  lines.forEach(([x1, y1, x2, y2, sx, sy]) => {
    if (x1 === x2) traverse(grid, x1, y1, x2, y2, 0, sy);
    if (y1 === y2) traverse(grid, x1, y1, x2, y2, sx, 0);
  });
  return count(grid);
}

function part2(lines) {
  const grid = arr(999 * 999);
  lines.forEach((line) => traverse(grid, ...line));
  return count(grid);
}

console.log(part1(lines), part2(lines));

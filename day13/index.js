const { getInput, arr } = require("../util");

const dots = [];
const instructions = [];
getInput(__dirname).forEach((row) => {
  if (row === "") return;
  if (row.startsWith("fold")) {
    const instruction = row.replace("fold along ", "").split("=");
    instruction[1] = Number(instruction[1]);
    return instructions.push(instruction);
  }
  dots.push(row.split(",").map(Number));
});

const BLANK = " ";
const DOT = "#";

const arr2d = (width, height, fill) => {
  const map = arr(height, null);
  for (let y = 0; y < height; y++) {
    map[y] = arr(width, fill);
  }
  return map;
};

function fold(map, axis, pos) {
  if (axis === "y") {
    for (let y = pos + 1; y < map.height; y++) {
      const mirrorY = pos - (y - pos);
      for (let x = 0; x < map.width; x++) {
        const value = map.data[y][x];
        if (value === BLANK) continue;
        map.data[mirrorY][x] = value;
      }
    }
    map.data = map.data.slice(0, pos);
    map.height = pos;
    return;
  }

  for (let y = 0; y < map.height; y++) {
    for (let x = pos + 1; x < map.width; x++) {
      const mirrorX = pos - (x - pos);
      const value = map.data[y][x];
      if (value === BLANK) continue;
      map.data[y][mirrorX] = value;
    }
  }
  map.data = map.data.map((row) => row.slice(0, pos));
  map.width = pos;
}

const createMap = (dots) => {
  let width = Math.max(...dots.map(([x, y]) => x)) + 1;
  let height = Math.max(...dots.map(([x, y]) => y)) + 1;
  let data = arr2d(width, height, BLANK);
  for (const [x, y] of dots) {
    data[y][x] = DOT;
  }
  return { width, height, data };
};

function part1(dots, instructions) {
  const map = createMap(dots);
  fold(map, ...instructions[0]);
  console.log(map.data.flat().filter((i) => i === DOT).length);
}

function part2(dots, instructions) {
  const map = createMap(dots);
  for (const instruction of instructions) {
    fold(map, ...instruction);
  }
  console.log(map.data.map((r) => r.join("")).join("\n"));
}

console.log(part1(dots, instructions));
console.log(part2(dots, instructions));

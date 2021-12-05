const { getInput } = require("../util");

const input = getInput(__dirname);

function part1(commands) {
  let x = 0;
  let y = 0;
  commands.forEach((command) => {
    const [direction, distance] = command.split(" ");
    switch (direction) {
      case "forward":
        x += Number(distance);
        break;
      case "up":
        y -= Number(distance);
        break;
      case "down":
        y += Number(distance);
        break;
    }
  });
  return x * y;
}

function part2(commands) {
  let x = 0;
  let y = 0;
  let aim = 0;
  commands.forEach((command) => {
    const [direction, distance] = command.split(" ");
    switch (direction) {
      case "forward":
        x += Number(distance);
        y += Number(distance) * aim;
        break;
      case "up":
        aim -= Number(distance);
        break;
      case "down":
        aim += Number(distance);
        break;
    }
  });
  return x * y;
}

console.log(part1(input), part2(input));

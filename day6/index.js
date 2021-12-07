const { getInput, sum, arr } = require("../util");

const input = getInput(__dirname)[0].split(",").map(Number);

const simulate = (iterations) => {
  const days = arr(9);
  input.forEach((fish) => days[fish]++);
  let spawn = days[0];
  for (let d = 0; d < iterations; d++) {
    for (let i = 0; i < 8; i++) {
      days[i] = days[i + 1];
    }
    days[8] = spawn;
    days[6] += spawn;
    spawn = days[0];
  }
  return sum(days);
};

const part1 = () => simulate(80);
const part2 = () => simulate(256);

console.log(part1(), part2());

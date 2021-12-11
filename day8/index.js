const { getInput, sum } = require("../util");

const input = getInput(__dirname)
  .map((row) => row.split(" | "))
  .map((bits) => bits.map((bit) => bit.split(" ").map((b) => new Set(b))));

const difference = (a, b) => new Set([...a].filter((x) => !b.has(x)));
const size = (l) => (i) => i.size === l;
const flat = (s) => [...s].sort().join("");

function part1(input) {
  return sum(
    input.map(
      ([_, b]) => b.filter((code) => [2, 3, 4, 7].includes(code.size)).length
    )
  );
}

function part2(input) {
  return sum(
    input.map(([codes, output]) => {
      let digits = [];
      digits[1] = codes.find(size(2));
      digits[4] = codes.find(size(4));
      digits[7] = codes.find(size(3));
      digits[8] = codes.find(size(7));

      const fives = codes.filter(size(5));
      fives.forEach((code) => {
        if (difference(code, digits[1]).size === 3) return (digits[3] = code);
        if (difference(code, digits[4]).size === 3) return (digits[2] = code);
        digits[5] = code;
      });

      const sixes = codes.filter(size(6));
      sixes.forEach((code) => {
        if (difference(code, digits[1]).size === 5) return (digits[6] = code);
        if (difference(code, digits[4]).size === 2) return (digits[9] = code);
        digits[0] = code;
      });

      digits = digits.map(flat);

      return Number(output.map((o) => digits.indexOf(flat(o))).join(""));
    })
  );
}

console.log(part1(input), part2(input));

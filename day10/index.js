const { getInput, sum } = require("../util");

const input = getInput(__dirname).map((row) => row.split(""));

const isOpen = (char) => ["(", "[", "{", "<"].includes(char);
const isPair = (c1, c2) => ["()", "[]", "{}", "<>"].includes([c1, c2].join(""));
const opposite = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};
const scores = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const corruptedScore = (row) => {
  const queue = [row.shift()];
  for (let char of row) {
    if (isOpen(char)) {
      queue.push(char);
    } else {
      const last = queue.pop();
      if (isPair(last, char) === false) {
        return { queue, score: scores[char] };
      }
    }
  }
  return { queue, score: 0 };
};

const toMissingScore = (arr) => {
  let score = 0;
  let values = { ")": 1, "]": 2, "}": 3, ">": 4 };
  for (let char of arr) {
    score = score *= 5;
    score += values[char];
  }
  return score;
};

const toMissing = ({ queue }) => {
  const missing = [];
  for (let i = queue.length - 1; i >= 0; i--) {
    const char = queue[i];
    missing.push(opposite[char]);
  }
  return missing;
};

function part1(input) {
  return sum(input.map((row) => corruptedScore(row).score));
}

function part2(input) {
  const incomplete = input
    .map((row) => corruptedScore(row))
    .filter((row) => row.score === 0);

  const scores = incomplete
    .map(toMissing)
    .map(toMissingScore)
    .sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
}

const test = [
  "[({(<(())[]>[[{[]{<()<>>",
  "[(()[<>])]({[<{<<[]>>(",
  "{([(<{}[<>[]}>{[]{[(<()>",
  "(((({<>}<{<{<>}{[]{[]{}",
  "[[<[([]))<([[{}[[()]]]",
  "[{[{({}]{}}([{[{{{}}([]",
  "{<[[]]>}<{[{[{[]{()[[[]",
  "[<(<(<(<{}))><([]([]()",
  "<{([([[(<>()){}]>(<<{{",
  "<{([{{}}[<[[[<>{}]]]>[]]",
].map((row) => row.split(""));

// console.log(part2(test));

console.log(part1(input), part2(input));

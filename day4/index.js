const { getInput } = require("../util");

function getData() {
  const input = getInput(__dirname);
  const numbers = input.shift().split(",").map(Number);
  const boards = chunk(
    input
      .filter((row) => row !== "")
      .map((row) =>
        row.replace(/\s{2}/g, " 0").replace(/^\s/, "0").split(" ").map(Number)
      ),
    5
  );
  return [numbers, boards];
}

function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const sumBoard = (board) =>
  board.map((row) => row.reduce(sumNotNull)).reduce(sumNotNull);

const sumNotNull = (total, num) => {
  if (num === null) return total;
  return total + num;
};

const getWinner = (boards) => boards.find(isWinner);

const isWinner = (board) => {
  for (let i = 0; i < 5; i++) {
    const row = board[i];
    if (allNull(row) || allNull(column(board, i))) return true;
  }
  return false;
};

const column = (board, i) => [
  board[0][i],
  board[1][i],
  board[2][i],
  board[3][i],
  board[4][i],
];
const allNull = (items) => items.every((item) => item === null);
const notNull = (item) => item !== null;

const markNumber = (board, call) =>
  board.map((row) => row.map((number) => (number === call ? null : number)));

function part1(numbers, boards) {
  for (let call of numbers) {
    boards = boards.map((board) => markNumber(board, call));
    const winner = getWinner(boards);
    if (winner) return sumBoard(winner) * call;
  }
  return 0;
}

function part2(numbers, boards) {
  for (let call of numbers) {
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      if (board === null) continue;
      const marked = markNumber(board, call);
      if (isWinner(marked)) {
        boards[i] = null;
        if (allNull(boards)) {
          return sumBoard(marked) * call;
        }
        continue;
      }
      boards[i] = marked;
    }
  }
  return 0;
}

console.log(part1(...getData()));
console.log(part2(...getData()));

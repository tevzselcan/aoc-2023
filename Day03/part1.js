// Advent of Code Day 3 - Part 1

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day03/input.txt"),
  crlfDelay: Infinity,
});
const line_counter = (
  (i = 0) =>
  () =>
    ++i
)();

let symbolsLocations = [];
let numbersLocations = [];

rl.on("line", async (line, lineNumber = line_counter()) => {
  let symbols = line.split("");
  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i] !== "." && isNaN(symbols[i])) {
      symbolsLocations.push({ lineNumber, position: i });
    }
  }
  let numbers = line.match(/\b\d+\b/g);
  if (numbers) {
    let regex = /\b\d+\b/g;
    let match;

    while ((match = regex.exec(line)) !== null) {
      numbersLocations.push({
        lineNumber,
        position: match.index,
        endPosition: match.index + match[0].length,
        value: match[0],
      });
    }
  }
});

function isAdjacentToSymbol(number, symbols) {
  for (let i = 0; i < symbols.length; i++) {
    let symbol = symbols[i];

    let rowDifference = Math.abs(number.lineNumber - symbol.lineNumber);
    let colDifference = Math.abs(number.position - symbol.position);

    if (colDifference > 0) {
      if (
        (number.position < symbol.position &&
          number.endPosition >= symbol.position) ||
        (number.position > symbol.position &&
          symbol.endPosition >= number.position)
      ) {
        colDifference = 0;
      }
    }

    if (rowDifference <= 1 && colDifference <= 1) {
      return true;
    }
  }
}

rl.on("close", async () => {
  let result = 0;
  for (let i = 0; i < numbersLocations.length; i++) {
    if (isAdjacentToSymbol(numbersLocations[i], symbolsLocations)) {
      result += parseInt(numbersLocations[i].value);
    }
  }
  console.log(result);
});

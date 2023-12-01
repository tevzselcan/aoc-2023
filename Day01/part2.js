const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day01/input.txt"),
  crlfDelay: Infinity,
});

let pointsCounter = 0;
const digitRegex = /\d/g;
const stringRegex = /one|two|three|four|five|six|seven|eight|nine/g;
const wordToNumber = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

rl.on("line", async (line) => {
  let matches = [];
  while ((m = stringRegex.exec(line)) !== null) {
    matches.push(m);
    stringRegex.lastIndex = m.index + 1;
  }
  const digitMatches = [...line.matchAll(digitRegex)];

  matches = [...matches, ...digitMatches]
    .map((e) => {
      const returnValue = {
        digit: "",
        index: 0,
      };
      if (wordToNumber.hasOwnProperty(e[0]))
        returnValue.digit = wordToNumber[e[0]];
      else returnValue.digit = e[0];
      returnValue.index = e.index;
      return returnValue;
    })
    .sort((firstArray, secondArray) => firstArray.index - secondArray.index);
  let point = `${matches[0].digit}${matches[matches.length - 1].digit}`;
  pointsCounter += Number(point);
});
rl.on("close", async () => {
  console.log(pointsCounter);
});

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day01/input.txt"),
  crlfDelay: Infinity,
});

let pointsCounter = 0;

rl.on("line", async (line) => {
  let matches = line.match(/\d/g);
  let point = `${matches[0]}${matches[matches.length - 1]}`;
  pointsCounter += Number(point);
});

rl.on("close", async () => {
  console.log(pointsCounter);
});

// Advent of Code Day 2 - Part 2

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day02/input.txt"),
  crlfDelay: Infinity,
});

let points = 0;

rl.on("line", async (line) => {
  const gameSplit = line.split(":");
  const sets = gameSplit[1].split(/[,;]/);
  let red = 0;
  let green = 0;
  let blue = 0;

  for (let i = 0; i < sets.length; i++) {
    const [num, color] = sets[i].trim().split(" ");
    if (color === "red" && +num > red) red = +num;
    if (color === "green" && +num > green) green = +num;
    if (color === "blue" && +num > blue) blue = +num;
  }

  points += maxRed * maxGreen * maxBlue;
});

rl.on("close", async () => {
  console.log(points);
});

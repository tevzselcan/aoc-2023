// Advent of Code Day 2 - Part 1

const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day02/input.txt"),
  crlfDelay: Infinity,
});

let redCubes = 12;
let greenCubes = 13;
let blueCubes = 14;

let points = 0;

rl.on("line", async (line) => {
  let possible = true;
  let [game, cubes] = line.split(":");
  let sets = cubes.split(";");
  sets.forEach((set) => {
    let red = 0;
    let green = 0;
    let blue = 0;
    let cubes = set.split(",");
    cubes = cubes.map((cube) => cube.trim());
    cubes.forEach((cube) => {
      let [number, color] = cube.split(" ");
      switch (color) {
        case "red":
          red += parseInt(number);
          break;
        case "green":
          green += parseInt(number);
          break;
        case "blue":
          blue += parseInt(number);
          break;
      }
    });
    if (red > redCubes) {
      possible = false;
    }
    if (green > greenCubes) {
      possible = false;
    }
    if (blue > blueCubes) {
      possible = false;
    }
  });

  if (possible) {
    let point = game.split(" ")[1];
    points += parseInt(point);
  }
});

rl.on("close", async () => {
  console.log(points);
});

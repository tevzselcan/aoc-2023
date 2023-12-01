const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

async function fetchInput(day) {
  const url = `https://adventofcode.com/2023/day/${day}/input`;
  try {
    const response = await axios.get(url, {
      headers: {
        Cookie: `session=${process.env.AOC_SESSION}`,
      },
    });
    return response.data.trim();
  } catch (error) {
    console.error("Error fetching input:", error);
    return null;
  }
}

const currentDate = new Date();
const day = currentDate.getDate();

const folderName = `Day${day.toString().padStart(2, "0")}`;
const folderPath = path.join(__dirname, folderName);

fs.mkdir(folderPath, async (err) => {
  if (err) {
    console.error("Error creating folder:", err);
  } else {
    console.log(`Folder '${folderName}' created successfully.`);

    const input = await fetchInput(day);
    if (input !== null) {
      const inputFilePath = path.join(folderPath, "input.txt");
      fs.writeFile(inputFilePath, input, (err) => {
        if (err) {
          console.error("Error writing input data:", err);
        } else {
          console.log("Input data saved to input.txt");
        }
      });

      const baseCode = `// Advent of Code Day ${day} - Part `;

      const part1FilePath = path.join(folderPath, "part1.js");
      fs.writeFile(part1FilePath, baseCode + "1\n", (err) => {
        if (err) {
          console.error("Error creating part1.js:", err);
        } else {
          console.log("part1.js created successfully.");
        }
      });

      const part2FilePath = path.join(folderPath, "part2.js");
      fs.writeFile(part2FilePath, baseCode + "2\n", (err) => {
        if (err) {
          console.error("Error creating part2.js:", err);
        } else {
          console.log("part2.js created successfully.");
        }
      });
    }
  }
});

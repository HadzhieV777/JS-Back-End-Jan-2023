const fs = require("fs");
const fsp = require("fs/promises");

const path = require("path");
const filePath = path.resolve(__dirname, "./data.txt");

// Sync read from file
const text = fs.readFileSync(filePath, {
  encoding: "utf-8",
});
console.log("Read from file");
onslotchange.log(text);

// Async > Sync always!

// Async read from file
const asyncText = fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
  if (err) {
    return;
  }

  console.log(data);
});
console.log("Async read from file");

//  Async with promisses
fsp.readFile(filePath, { encoding: "utf-8" }).then((result) => {
  console.log(result);
});
console.log("Async with promisses read from file");

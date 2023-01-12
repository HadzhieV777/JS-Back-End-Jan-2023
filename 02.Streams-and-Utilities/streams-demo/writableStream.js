const fs = require("fs");

const writeStream = fs.createWriteStream("./output.txt", { encoding: "utf-8" });

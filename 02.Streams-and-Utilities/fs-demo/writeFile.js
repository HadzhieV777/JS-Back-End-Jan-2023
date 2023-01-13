const fs = require("fs");
const path = require('path')

fs.writeFile(path.resolve(__dirname, './output.txt'), "Pesho", () => {
  console.log("file created");
});

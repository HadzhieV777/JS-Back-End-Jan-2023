const fs = require("fs");

fs.writeFile("./output.txt", "Pesho", () => {
  console.log("file created");
});

const fsp = require("fs/promises");
const db = require("../config/database.json");
const path = require("path");

class Cube {
  constructor(name, description, imageUrl, difficultyLevel) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.difficultyLevel = difficultyLevel;
  }

  static async save(cube) {
    try {
      // Read file
      const data = await fsp.readFile(
        path.resolve(__dirname, "../config/database.json"),
        "utf-8"
      );

      // Parse data
      const jsonData = JSON.parse(data);

      // Push the obj
      jsonData.cubes.push(cube);

      // Write the stringified obj
      await fsp.writeFile(
        path.resolve(__dirname, "../config/database.json"),
        JSON.stringify(jsonData)
      );
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Cube;

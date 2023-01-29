const mongoose = require("mongoose");
const config = require("./config");

async function initDatabase() {
  mongoose.set("strictQuery", false);

  await mongoose.connect(config.development.db_uri);

  console.log("DB connected...");
}

module.exports = initDatabase;

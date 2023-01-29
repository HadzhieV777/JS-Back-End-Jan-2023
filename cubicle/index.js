const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
const app = require("express")();

const initDatabase = require("./config/databaseInit");

require("./config/express")(app);

initDatabase()
  .then(() =>
    app.listen(
      config.port,
      console.log(`Listening on port ${config.port}! Now its up to you...`)
    )
  )
  .catch((err) => console.log(err));

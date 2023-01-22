const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];
const app = require("express")();
const routes = require("./config/routes");
require("./config/express")(app);

// Middlewares
app.use("/", routes);
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(
  config.port,
  console.log(`Listening on port ${config.port}! Now its up to you...`)
);

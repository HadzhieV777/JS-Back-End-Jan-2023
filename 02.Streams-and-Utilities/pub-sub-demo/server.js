const http = require("http");
const port = "3000";

const eventBus = require("./eventBus");
// Wrong
// const logger = require("./logger");
// const reporter = require("./reportingService");

const server = http.createServer((req, res) => {
  console.log("TODO...");
  //   logger.log("Request: -" + req.url);
  //   reporter.collect(`${req.method} - ${req.url}`);

  eventBus.publish("request", { method: req.method, url: req.url });
  res.end();
});

server.listen(port);
console.log(`Server is listening on port ${port}...`);

const http = require("http");

// Router
const router = require("./router/router");
const addBreedHandler = require("./handlers/addBreed");
const addCatHandler = require("./handlers/addCat");
const homeHandler = require("./handlers/home");

// Routes
router.get("/", homeHandler.get);
router.get("/cats/add-breed", addBreedHandler.get);
router.get("/cats/add-cat", addCatHandler.get);

const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer(requestHandler);

function requestHandler(req, res) {
  const url = new URL(req.url, "http://localhost");

  console.log(req.method, req.url);

  const handler = router.match(req.method, url.pathname);
  handler(req, res);
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

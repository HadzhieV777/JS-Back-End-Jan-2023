const homeHandler = require("../handlers/home");
const staticHandler = require("../handlers/static-files");

const handlers = {};

function match(method, url) {
  if (url === '/favicon.ico') {
    return faviconHandler;
  }

  if (method == "GET" && url.startsWith("/content/")) {
    return staticHandler;
  }

  if (method == "GET" && url === "/") {
    return homeHandler.get;
  }

  const foundUrl = Object.keys(handlers).find(
    (x) => url.startsWith(x) && x != "/"
  );

  if (!foundUrl) {
    return notFoundHandler;
  }
  const handler = handlers[foundUrl][method];
  
  return handler;

}

function registerHandler(method, url, handler) {
  let methods = handlers[url];

  if (methods == undefined) {
    methods = {};
    handlers[url] = methods;
  }

  handlers[url][method] = handler;
}

function faviconHandler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/x-icon");
  res.end("");
}

function notFoundHandler(req, res) {
  res.statusCode = 404;
  res.write("Not Found!");
  res.end();
}

module.exports = {
  registerHandler,
  get: (...params) => registerHandler("GET", ...params),
  post: (...params) => registerHandler("POST", ...params),
  match,
};

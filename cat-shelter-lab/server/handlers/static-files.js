const fsp = require("fs/promises");

async function staticHandler(req, res) {
  const pathname = req.url;

  try {
    const data = await fsp.readFile(`./${pathname}`, getEncoding(pathname));

    res.writeHead(200, {
      "Content-Type": getContentType(pathname),
    });
    res.write(data);
    res.end();
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  }
}

function getContentType(pathname) {
  if (pathname.endsWith("css")) {
    return "text/css";
  }
  if (pathname.endsWith("jpeg") || pathname.endsWith("jpg")) {
    return "image/jpeg";
  }
  if (pathname.endsWith("png")) {
    return "image/png";
  }
}

function getEncoding(pathname) {
  if (
    pathname.endsWith("jpeg") ||
    pathname.endsWith("jpg") ||
    pathname.endsWith("png")
  ) {
    return "";
  }
  return "utf-8";
}

module.exports = staticHandler;

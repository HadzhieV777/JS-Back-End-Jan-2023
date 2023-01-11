const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>Home page</h1>");
    res.end()
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
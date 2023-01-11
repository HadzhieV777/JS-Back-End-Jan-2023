const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;

// Handlers
const handlers = require('./handlers/index')

const server = http.createServer((req, res) => {
   
    for (let handler of handlers) {
        if(!handler(req, res)) {
            break;
        }
    }

})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})
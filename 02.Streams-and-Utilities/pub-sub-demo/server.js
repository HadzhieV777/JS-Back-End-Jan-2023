const http = require('http')
const port = "3000"

const logger = require('./logger');

const server = http.createServer((req, res) => {
    console.log('TODO...')
    logger.log('Request: -' + req.url);

    res.end();
})

server.listen(port);
console.log(`Server is listening on port ${port}...`)
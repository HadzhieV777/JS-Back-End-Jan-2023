const http = require('http')
const port = "3000"

const server = http.createServer((req, res) => {
    console.log('TODO...')

    res.end();
})

server.listen(port);
console.log(`Server is listening on port ${port}...`)
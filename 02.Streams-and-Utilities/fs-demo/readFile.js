const fs = require('fs')

// Sync read from file
const text = fs.readFileSync('./data.txt', {encoding: 'utf-8'});
console.log('Read from file');
onslotchange.log(text)
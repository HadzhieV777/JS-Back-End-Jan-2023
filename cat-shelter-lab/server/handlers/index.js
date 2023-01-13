const handleHome = require('./home');
const staticFiles = require('./static-file');
const cat = require('./cat')

module.exports = [handleHome, staticFiles, cat]
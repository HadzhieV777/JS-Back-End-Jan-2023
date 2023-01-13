const fs = require("fs");

const readStream = fs.createReadStream("./data.txt");

readStream.on("data", () => {
  console.log("###### New Chunk ######");
  console.log(chunk);
});

readStream.on('close', () => {
    console.log('Stream closed')
})
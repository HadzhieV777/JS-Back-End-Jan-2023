const fsp = require("fs/promises");

async function getAllCats(req) {
  const data = await fsp.readFile("./data/cats.json");
  const catId = decodeURIComponent(req.url.split("/")[2]);
  const cats = JSON.parse(data);
  const cat = cats.find((x) => x.id == catId);
  return {
    cats,
    cat,
  };
}

module.exports = getAllCats;

const Housing = require("../models/Housing");

async function getAll() {
  return Housing.find().lean();
}

async function getById(id) {
  return Housing.findById(id).lean();
}

async function create(housing) {
  return await Housing.create(housing);
}

async function update(id, housing) {
  const existing = await Housing.findById(id);

  existing.name = housing.name;
  existing.type = housing.type;
  existing.year = housing.year;
  existing.city = housing.city;
  existing.imageUrl = housing.imageUrl;
  existing.description = housing.description;
  existing.availablePieces = housing.availablePieces;

  await existing.save();
}

async function deleteById(id) {
  await Housing.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

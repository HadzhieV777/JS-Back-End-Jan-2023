const Housing = require("../models/Housing");

async function getAll() {
  return Housing.find().lean();
}

async function getTopHouses() {
  return Housing.find().sort({ createdAt: -1 }).limit(3).lean();
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
  await Housing.findByIdAndRemove(id);
}

async function rent(housingId, userId) {
  const housing = await Housing.findById(housingId);

  if (housing.tenants.includes(userId)) {
    throw new Error("Cannot rent twice!");
  }

  housing.tenants.push(userId);
  housing.availablePieces -= 1;

  await housing.save();
}

async function filter(type) {
  return Housing.find({ type }).lean();
}

module.exports = {
  getAll,
  getById,
  getTopHouses,
  create,
  update,
  deleteById,
  rent,
  filter,
};

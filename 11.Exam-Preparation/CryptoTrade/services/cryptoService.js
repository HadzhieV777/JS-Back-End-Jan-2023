const Crypto = require("../models/Crypto");

async function getAll() {
  return Crypto.find({}).lean();
}

async function getById(id) {
  return Crypto.findById(id).lean();
}

async function create(crypto) {
  return await Crypto.create(crypto);
}

async function update(id, crypto) {
  const existing = await Crypto.findById(id);

  existing.name = crypto.name;
  existing.imageUrl = crypto.imageUrl;
  existing.price = crypto.price;
  existing.description = crypto.description;
  existing.payment = crypto.payment;

  await existing.save();
}

async function deleteById(id) {
  await Crypto.findByIdAndRemove(id);
}

async function purchase(cryptoId, userId) {
  const crypto = await Crypto.findById(cryptoId);

  if (crypto.buyers.includes(userId)) {
    throw new Error("Cannot purchase twice!");
  }

  crypto.buyers.push(userId);
  await crypto.save();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
  purchase,
};

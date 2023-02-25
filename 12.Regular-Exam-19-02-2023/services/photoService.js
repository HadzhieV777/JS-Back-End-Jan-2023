const Photo = require("../models/Photo");
const User = require("../models/User")

async function getAll() {
  return Photo.find({}).populate("owner", "username").lean();
}

async function getOnlyPic(id) {
  return await Photo.findById(id).lean();
}

async function getById(id) {
  return await Photo.findById(id)
    .populate({
      path: "commentList",
      populate: { path: "userID", select: "username" },
    })
    .populate("owner", "username")
    .lean();
}

async function create(photo) {
  return await Photo.create(photo);
}

async function update(id, photo) {
  const existing = await Photo.findById(id);

  existing.name = photo.name;
  existing.imageUrl = photo.imageUrl;
  existing.age = photo.age;
  existing.description = photo.description;
  existing.location = photo.location;

  await existing.save();
}

async function deleteById(id) {
  await Photo.findByIdAndRemove(id);
}

async function addCommentToPhoto(photoId, userId, comment) {
  const photo = await Photo.findById(photoId);

  const user = await User.findById(userId);
  const username = user.username;

  photo.commentList.push({ userID: userId, comment: comment, username: username });

  await photo.save();
}

module.exports = {
  getAll,
  getOnlyPic,
  getById,
  create,
  update,
  deleteById,
  addCommentToPhoto
};

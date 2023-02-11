function parseError(error) {
  if (error.name == "ValidationError") {
    // Handle mongoose errors
    return Object.values(error.errors).map((v) => v.message);
  } else {
    // Handle custom error
    return error.message.split("\n");
  }
}

module.exports = {
  parseError,
};

module.exports = {
  development: {
    port: process.env.PORT || 3000,
    db_uri: "mongodb://127.0.0.1:27017/cubicle",
  },
  production: {},
};

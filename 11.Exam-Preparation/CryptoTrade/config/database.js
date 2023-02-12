const mongoose = require("mongoose");


const CONNECTION_STRING = "mongodb://127.0.0.1:27017/crypto-trade";

module.exports = async (app) => {
  try {
    mongoose.set("strictQuery", false);
    
    await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected...")
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

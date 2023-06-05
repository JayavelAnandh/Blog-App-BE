const mongoose = require("mongoose");

function dataBaseConnection() {
  const params = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.MONGO_URL, params);
    console.log("DB is connected");
  } catch (error) {
    console.log("Error", error);
  }
}
module.exports = { dataBaseConnection };

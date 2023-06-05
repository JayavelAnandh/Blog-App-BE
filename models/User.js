const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  gmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThlTauvFuw7q1xluWrxtf2uFBYgaa_a2GQfg&usqp=CAU",
  },
});

const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};

const User = mongoose.model("user", userSchema);
module.exports = { User, generateAuthToken };

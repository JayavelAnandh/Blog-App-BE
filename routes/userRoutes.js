const express = require("express");
const bcrypt = require("bcrypt");
const { generateAuthToken, User } = require("../models/User.js");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let newUser = await User.findOne({ gmail: req.body.gmail });
    if (newUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    let salt = await bcrypt.genSalt(10);
    let userPassword = req.body.password.toString();
    let hashedPassword = await bcrypt.hash(userPassword, salt);

    newUser = await new User({
      userName: req.body.userName,
      gmail: req.body.gmail,
      password: hashedPassword,
      pic: req.body.pic,
    }).save();

    let AuthToken = generateAuthToken(newUser._id);
    res.status(200).send({ authToken: AuthToken, userDetails: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
router.post("/login", async (req, res) => {
  try {
    const userToLogin = await User.findOne({ gmail: req.body.gmail });

    if (!userToLogin) {
      return res.status(400).send("User not found");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userToLogin.password
    );

    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }

    const authToken = await generateAuthToken(userToLogin._id);
    res.status(200).send({ authToken: authToken, userDetails: userToLogin });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
const userRoutes = router;
module.exports = { userRoutes };

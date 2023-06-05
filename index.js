const express = require("express");
const dotenv = require("dotenv");
const { userRoutes } = require("./routes/userRoutes");
const cors = require("cors");
const { dataBaseConnection } = require("./db");

const app = express();

dotenv.config();

dataBaseConnection();
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.get("/", (req, res) => {
  res.status(200).send("This is the server response for Blog-App.");
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});

const express = require("express");
const { Blog } = require("../models/Blog");

const router = express.Router();

router.post("/new", async (req, res) => {
  try {
    let newBlog = await new Blog({
      userName: req.body.userName,
      title: req.body.title,
      description: req.body.description,
      pic: req.body.pic,
    }).save();
    res.status(200).send({ blogDetails: newBlog });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
router.get("/", async (req, res) => {
  try {
    let blogs;
    if (req.params.userName) {
      let userName = req.params.userName;
      blogs = await Blog.find({ userName });
      return res.status(200).send(blogs).sort({ updatedAt: -1 });
    }
    blogs = await Blog.find({});
    return res.status(200).send(blogs).sort({ updatedAt: -1 });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
const blogRoutes = router;
module.exports = { blogRoutes };

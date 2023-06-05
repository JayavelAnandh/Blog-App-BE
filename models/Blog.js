const mongoose = require("mongoose");

let blogSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTpoDh1s7L43W3QbYfNlfxw-DYPIAmxHYLjvzuwjM9BpeV_daLJNKEHn0ogWk4-mt8Qpg&usqp=CAU",
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("blog", blogSchema);
module.exports = { Blog };

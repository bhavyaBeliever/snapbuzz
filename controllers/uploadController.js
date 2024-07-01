const mongoose = require("mongoose");
const User = require("../models/userSchema");
const Post = require("../models/postSchema");

const uploadController = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new Post(post);

    await newPost.save()
    
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { posts: newPost._id } },
      { new: true, useFindAndModify: false }
    );

    console.log("New Post Created");

    res.status(200).json({ "message": "post created" })
  }
  catch (error) {
    console.log("Error While Creating post", error);
    res.status(400).json({ "error": error })
  }
};

module.exports = uploadController;
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { response } = require("express");

const loginController = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    let user;
    if (identifier.includes("@") && identifier.includes(".com")) {
      user = await User.findOne({ email: identifier });
    } 
    else if (!isNaN(Number(identifier)) && identifier.trim() !== '') {
      user = await User.findOne({ phone: identifier });
    } 
    else {
      user = await User.findOne({ username: identifier });
    }

    if (!user) {
      res.status(401).json({ error: "User Doesn't Exist" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Wrong Password" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Please try again..." });
  }
  
};

module.exports = loginController;
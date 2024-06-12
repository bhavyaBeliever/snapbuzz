const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const signupController = async (req, res) => {
  try {
    const user = req.body;
    //password encryption
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    
    //user creation
    const newUser = new User(user);
    await newUser.save();
    console.log("User Created");
    //sending response
    res.status(200).send("User Created");
  }
  catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}

module.exports = signupController;
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
    res.status(200).json(newUser);
  }
  catch (error) {
    console.log(error);
    if (error.name==="ValidationError") {
      res.status(400).json({ error: "Invalid User Data" });   
      return;
    }
    else if(error.code===11000) { 
      res.status(400).json({ error: "User Already Exists" });
      return;
    }
    res.status(500).json({ error: "Please try again..." });
    return;
  }
}

module.exports = signupController;
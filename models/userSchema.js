const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://ui-avatars.com/api/?name=John+Doe",
    },
    bio: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    gender:{
      type:String,
      enum:["male","female","prefer not to say"],
      default:"prefer not to say"
    }

  },
  { timestamps: true }
);
UserSchema.statics.authenticate = async function (identifier, password) {
  let user;
  if (identifier.includes("@") && identifier.includes(".com")) {
    user = await this.findOne({ email: identifier });
  } else if(!isNaN(Number(identifier)) && identifier.trim() !== '') {
    user = await this.findOne({ phone: identifier });
  } else {
    user = await this.findOne({ username: identifier });
  }

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Wrong Password");
  }

  return user;
};
module.exports = mongoose.model("User", userSchema);

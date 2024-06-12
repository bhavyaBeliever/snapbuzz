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
// UserSchema.statics.authenticate = async function (identifier, password) {
  // let user;
  
//};
module.exports = mongoose.model("User", userSchema);

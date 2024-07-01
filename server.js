const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");//imported to get end to end access of req and res
const user = require("./routes/user");
const posts = require("./routes/posts");

const userInfo = require("./routes/userInfo");

const port=4000;

const app=express();
app.get("/",(req,res)=>{
  res.send("Backend Starts...")
})
app.get('/api/env/cloudInfo', (req, res) => {
  res.json({
    cloudName: process.env.CLOUD_NAME, 
    preset: process.env.PRESET,
  });
});

//routes
app.use(cors());
app.use(express.json());
app.use("/user",user);
app.use("/users", userInfo)
app.use("/posts", posts)

//connect to db
mongoose
.connect(process.env.MONGO_URI)
.then((result) => {
    app.listen(port, () => {
      console.log("Connected to MongoDB");
    })})
  .catch((err) => {
    console.log(err);
  })

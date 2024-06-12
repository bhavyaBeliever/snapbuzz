const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");//imported to get end to end access of req and res
const user = require("./routes/user");
const port=4000;

const app=express();
app.get("/",(req,res)=>{
  res.send("Backend Starts...")
})

//routes
app.use(cors());
app.use(express.json());
app.use("/user",user)

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

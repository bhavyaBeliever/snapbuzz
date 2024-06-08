const express = require("express");
const mongoose = require("mongoose");
const port=4000;

const app=express();
app.listen(port);
app.get("/",(req,res)=>{
  res.send("Backend Starts...")
})

//routes

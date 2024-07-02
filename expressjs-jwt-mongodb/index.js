require("dotenv").config();
// console.log(require("dotenv").config());

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then((result) => app.listen(3000))
  .catch((error) => console.log("Error in connecting to MongoDB", error));

app.get("/", (req, res) => res.render("home"));
app.get("/recipes", (req, res) => res.render("recipes"));

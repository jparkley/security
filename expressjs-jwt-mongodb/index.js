require("dotenv").config();
// console.log(require("dotenv").config());

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const verifyJwt = require("./common/middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then((result) => app.listen(3000))
  .catch((error) => console.log("Error in connecting to MongoDB", error));

app.get("/", (req, res) => res.render("home"));
app.get("/recipes", verifyJwt, (req, res) => res.render("recipes"));

app.use(authRoutes);

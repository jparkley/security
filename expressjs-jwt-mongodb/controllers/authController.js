const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { MAX_AGE } = require("../common/constants");

const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: MAX_AGE,
  });
};

const handleErrors = (error) => {
  // console.log("error: ", error);

  let errors = { email: "", password: "" };
  if (error.code === 11000) {
    errors.email = "Email already registered. Please try another";
    return errors;
  }

  if (error.message.includes("user validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

function getSignup(req, res) {
  res.render("signup");
}

const postSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createJWT(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * MAX_AGE });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

function getLogin(req, res) {
  res.render("login");
}

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json({ user: user._id });
  } catch (error) {
    res.status(400).json({});
  }
};

module.exports = {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
};

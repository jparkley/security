const User = require("../models/User");

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
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

function getLogin(req, res) {
  res.render("login");
}

function postLogin(req, res) {
  const { email, password } = req.body;
  console.log("--=======---", email, password);
  res.send("post login");
}

module.exports = {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
};

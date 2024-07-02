function getSignup(req, res) {
  res.render("signup");
}

function postSignup(req, res) {
  res.send("post signup");
}

function getLogin(req, res) {
  res.render("login");
}

function postLogin(req, res) {
  res.send("post login");
}

module.exports = {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
};

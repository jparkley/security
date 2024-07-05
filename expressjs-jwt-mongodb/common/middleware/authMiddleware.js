const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("Token validation Error:", err);
        res.redirect("/login");
      } else {
        console.log("Token decodedToken:", decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = verifyJwt;

const jwt = require("express-jwt");
require("dotenv").config();

const checkJwt = jwt({
  secret: process.env.ACCESS_TOKEN_SECRET,
  algorithms: ["HS256"],
});

module.exports = checkJwt;

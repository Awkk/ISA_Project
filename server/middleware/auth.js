require("dotenv").config();
const jwt = require("express-jwt");

const checkJwt = jwt({
  secret: process.env.ACCESS_TOKEN_SECRET,
  algorithms: ["HS256"],
});

module.exports = checkJwt;

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { name, password } = req.body;
    console.log(name, password);
    res.send("user POST route");
  } catch (err) {
    console.err(err.message);
  }
});

router.get("/login", (req, res) => {
  res.send("user Get route");
});

module.exports = router;

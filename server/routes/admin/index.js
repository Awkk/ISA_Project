const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("admin Get route");
});

module.exports = router;

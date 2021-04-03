const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("comment POST route");
});

router.get("/:commentId", (req, res) => {
  res.send("comment Get route");
});

router.put("/:commentId", (req, res) => {
  res.send("comment PUT route");
});

router.put("/vote/:commentId", (req, res) => {
  res.send("comment/vote PUT route");
});

router.delete("/:commentId", (req, res) => {
  res.send("comment Delete route");
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.send("post POST route");
});

router.get("/:postId", (req, res) => {
  res.send("post Get route");
});

router.put("/:postId", (req, res) => {
  res.send("post PUT route");
});

router.put("/vote/:postId", (req, res) => {
  res.send("post/vote PUT route");
});

router.delete("/:postId", (req, res) => {
  res.send("post Delete route");
});

module.exports = router;

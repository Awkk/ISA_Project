const express = require("express");
const router = express.Router();
const pool = require("../../dbconfig");

const GetAllPostQuery =
  "SELECT post_id, username, title, createdate, modifydate FROM post p LEFT JOIN users u ON p.user_id = u.user_id;";
const InsertPostQuery =
  "INSERT INTO post (user_id, title, content) VALUES ($1, $2, $3)";

router.get("/", async (_, res) => {
  try {
    const posts = await pool.query(GetAllPostQuery);
    res.status(200).json(posts.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, title, content } = req.body;
    await pool.query(InsertPostQuery, [user_id, title, content]);
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
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

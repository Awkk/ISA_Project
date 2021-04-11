const express = require("express");
const router = express.Router();
const pool = require("../../dbconfig");

const InsertCommentQuery =
  "INSERT INTO comment (post_id, user_id, content) VALUES ($1, $2, $3)  RETURNING *";
const GetCommentByPostIdQuery =
  "SELECT comment_id, c.user_id, username, content, c.createdate, modifydate FROM comment c LEFT JOIN users u on c.user_id = u.user_id WHERE post_id = $1";

router.post("/", async (req, res) => {
  try {
    const { user_id, post_id, content } = req.body;

    const newComment = await pool.query(InsertCommentQuery, [
      post_id,
      user_id,
      content,
    ]);
    res.status(201).json(newComment.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const posts = await pool.query(GetCommentByPostIdQuery, [
      req.params.postId,
    ]);
    res.status(200).json(posts.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
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

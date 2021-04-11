const express = require("express");
const router = express.Router();
const pool = require("../../dbconfig");

const InsertCommentQuery =
  "INSERT INTO comment (post_id, user_id, content) VALUES ($1, $2, $3)  RETURNING *";
const GetCommentByPostIdQuery =
  "SELECT comment_id, c.user_id, username, content, vote, c.createdate, modifydate FROM comment c LEFT JOIN users u on c.user_id = u.user_id WHERE post_id = $1";
const UpdateCommentQuery =
  "UPDATE comment SET content = $1, modifydate = now() where comment_id = $2";
const DeleteCommentQuery = "DELETE FROM comment where comment_id = $1";
const GetCurrentVoteQuery = "SELECT vote FROM comment where comment_id = $1";
const UpdateVoteQuery = "UPDATE comment SET vote = $1 WHERE comment_id= $2";

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

router.put("/:commentId", async (req, res) => {
  try {
    const { content } = req.body;
    await pool.query(UpdateCommentQuery, [content, req.params.commentId]);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.put("/vote/:commentId", async (req, res) => {
  try {
    const { user_id, value } = req.body;
    const currentVote = await pool.query(GetCurrentVoteQuery, [
      req.params.commentId,
    ]);
    await pool.query(UpdateVoteQuery, [
      currentVote.rows[0].vote + value,
      req.params.commentId,
    ]);
    res.status(202).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.delete("/:commentId", async (req, res) => {
  try {
    await pool.query(DeleteCommentQuery, [req.params.commentId]);
    res.status(202).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../../dbconfig");

const GetAllPostQuery =
  "SELECT post_id, username, title, vote, createdate, modifydate FROM post p LEFT JOIN users u ON p.user_id = u.user_id";
const InsertPostQuery =
  "INSERT INTO post (user_id, title, content) VALUES ($1, $2, $3)";
const GetPostByIdQuery =
  "SELECT post_id, p.user_id, username, title, vote, p.content, createdate, modifydate FROM post p LEFT JOIN users u ON p.user_id = u.user_id WHERE post_id = $1";
const UpdatePostQuery =
  "UPDATE post SET content = $1, modifydate = now() where post_id = $2";
const DeletePostQuery = "DELETE FROM post where post_id = $1";
const DeleteRelatedCommentsQuery = "DELETE FROM comment where post_id = $1";
const GetCurrentVoteQuery = "SELECT vote FROM post where post_id = $1";
const UpdateVoteQuery = "UPDATE post SET vote = $1 WHERE post_id= $2";

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

router.get("/:postId", async (req, res) => {
  try {
    const post = await pool.query(GetPostByIdQuery, [req.params.postId]);
    res.status(200).json(post.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.put("/:postId", async (req, res) => {
  try {
    const { content } = req.body;
    await pool.query(UpdatePostQuery, [content, req.params.postId]);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.put("/vote/:postId", async (req, res) => {
  try {
    const { user_id, value } = req.body;
    const currentVote = await pool.query(GetCurrentVoteQuery, [
      req.params.postId,
    ]);
    await pool.query(UpdateVoteQuery, [
      currentVote.rows[0].vote + value,
      req.params.postId,
    ]);
    res.status(202).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    await pool.query(DeleteRelatedCommentsQuery, [req.params.postId]);
    await pool.query(DeletePostQuery, [req.params.postId]);
    res.status(202).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

module.exports = router;

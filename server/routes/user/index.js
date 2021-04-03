const express = require("express");
const pool = require("../../dbconfig");
const router = express.Router();

const UserInsertQuery =
  "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *";

router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    const newUser = await pool.query(UserInsertQuery, [name, password]);
    res.json(newUser.rows[0]);
  } catch (err) {
    if (err.code == 23505) {
      res.json({ error: "Username not available" });
    }
    console.error(err);
  }
});

router.get("/login", (req, res) => {
  res.send("user Get route");
});

module.exports = router;

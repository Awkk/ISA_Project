const express = require("express");
const pool = require("../../dbconfig");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UsernameCheckQuery = "SELECT user_id FROM users WHERE username=$1";
const UserInsertQuery =
  "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *";

router.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    const checkUser = await pool.query(UsernameCheckQuery, [name]);

    if (checkUser.rowCount > 0) {
      res.status(409).json({ error: "Username not available" });
    } else {
      const hashedPw = await bcrypt.hash(password, saltRounds);
      const newUser = await pool.query(UserInsertQuery, [name, hashedPw]);
      res.status(201).json({ username: newUser.rows[0].username });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.get("/login", (req, res) => {
  res.send("user Get route");
});

module.exports = router;

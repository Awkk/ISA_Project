require("dotenv").config();
const express = require("express");
const pool = require("../../dbconfig");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const SelectUserQuery = "SELECT * FROM users WHERE username=$1";
const InsertUserQuery =
  "INSERT INTO users (username, password) VALUES($1, $2) RETURNING *";

router.post("/register", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await pool.query(SelectUserQuery, [name]);

    if (user.rowCount > 0) {
      res.status(409).json({ error: "username not available" });
    } else {
      const hashedPw = await bcrypt.hash(password, saltRounds);
      const newUser = await pool.query(InsertUserQuery, [name, hashedPw]);
      res.status(201).json({ username: newUser.rows[0].username });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await pool.query(SelectUserQuery, [name]);

    if (user.rowCount === 0) {
      res.status(401).json({ error: "username or password not correct" });
    } else {
      const correctPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
      if (!correctPassword) {
        res.status(401).json({ error: "username or password not correct" });
      } else {
        const tokenContent = {
          user_id: user.rows[0].user_id,
          username: user.rows[0].username,
        };
        const accessToken = jwt.sign(
          tokenContent,
          process.env.ACCESS_TOKEN_SECRET
        );
        res.status(200).json({ accessToken: accessToken });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../../dbconfig");

const SelectAllEndpointRequest = "SELECT * FROM api";

router.get("/", async (req, res) => {
  try {
    const requests = await pool.query(SelectAllEndpointRequest);

    res.status(200).json(requests.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

module.exports = router;

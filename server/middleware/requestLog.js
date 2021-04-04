const pool = require("../dbconfig");

module.exports = async (req, res, next) => {
  try {
    const { method, url } = req;
    const record = await pool.query(
      "SELECT * FROM api WHERE method = $1 AND endpoint = $2",
      [method, url]
    );
    if (record.rowCount === 0) {
      await pool.query(
        "INSERT INTO api(method, endpoint, request) VALUES ($1, $2, 1)",
        [method, url]
      );
    } else {
      await pool.query(
        "UPDATE api SET request = $1 WHERE method = $2 AND endpoint = $3;",
        [record.rows[0].request + 1, method, url]
      );
    }
  } catch (err) {
    console.error(err);
  }
  next();
};

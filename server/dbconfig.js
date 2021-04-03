const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  database: "Rebbit",
  user: "andrew",
  password: "password",
  port: 5432,
});

module.exports = pool;

const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL + "?sslmode=no-verify";

const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString }
    : {
        host: "localhost",
        database: "Rebbit",
        user: "andrew",
        password: "password",
        port: 5432,
      }
);

module.exports = pool;

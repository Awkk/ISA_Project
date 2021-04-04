const Pool = require("pg").Pool;

const pool = new Pool(
  process.env.DATABASE_URL || {
    host: "localhost",
    database: "Rebbit",
    user: "andrew",
    password: "password",
    port: 5432,
  }
);

// const pool = new Pool({
//   host: "ec2-54-235-108-217.compute-1.amazonaws.com",
//   database: "docvqm42r68po",
//   user: "wmgtfbuwypuxjr",
//   password: "f6322781c874610c633e363be6280b37a5940fae616fb8d54f5c45e6952c14eb",
//   port: 5432,
// });
module.exports = pool;

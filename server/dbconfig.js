const Pool = require("pg").Pool;

const pool = new Pool({
    user: "andrew",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "Rebbit"
});

export default pool;
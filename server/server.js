const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8888;
const pool = require("./dbconfig");

app.use(cors());
app.use(express.json());


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const pool = require("./dbconfig");
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

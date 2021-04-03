const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8888;
const version = "v1";

app.use(cors());
app.use(express.json());
app.use(`/api/${version}`, require("./routes"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

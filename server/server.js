const express = require("express");
const app = express();
const cors = require("cors");
const requestLog = require("./middleware/requestLog");
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(requestLog);
app.use("/api/v1", require("./routes"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/comment", require("./comment"));
router.use("/admin", require("./admin"));

module.exports = router;

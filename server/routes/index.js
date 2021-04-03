const express = require("express");
const router = express.Router();
const checkJwt = require("../middleware/auth");

router.use("/user", require("./user"));
router.use("/post", checkJwt, require("./post"));
router.use("/comment", checkJwt, require("./comment"));
router.use("/admin", checkJwt, require("./admin"));

module.exports = router;

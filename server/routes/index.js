const express = require("express");
const router = express.Router();
const checkJwt = require("../middleware/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../documentation/swagger.json");

router.use("/documentation", swaggerUi.serve);
router.get("/documentation", swaggerUi.setup(swaggerDocument));

router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/comment", require("./comment"));
router.use("/admin", require("./admin"));

module.exports = router;

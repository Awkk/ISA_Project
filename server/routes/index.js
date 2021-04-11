const express = require("express");
const router = express.Router();
const checkJwt = require("../middleware/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../documentation/swagger.json");

router.use("/documentation", swaggerUi.serve);
router.get("/documentation", swaggerUi.setup(swaggerDocument));

router.use("/user", require("./user"));
router.use("/post", checkJwt, require("./post"));
router.use("/comment", checkJwt, require("./comment"));
router.use("/admin", checkJwt, require("./admin"));

module.exports = router;

const router = require("express").Router();
const stockRoutes = require("./stocks");
//const nytRoutes = require("./nyt");

// NYT routes
router.use("/stocks", stockRoutes);

//router.use("/nyt", nytRoutes);

module.exports = router;

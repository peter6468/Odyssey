const router = require("express").Router();
const stockRoutes = require("./stocks");
const articleRoutes = require("./articles");
//const nytRoutes = require("./nyt");

// NYT routes
router.use("/stocks", stockRoutes);
router.use("/articles", articleRoutes);

//router.use("/nyt", nytRoutes);

module.exports = router;

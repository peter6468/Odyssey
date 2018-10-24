const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/nyt"
router
  .route("/")
  .get(articlesController.findAll);

module.exports = router;

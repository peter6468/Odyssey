const router = require("express").Router();
const stocksController = require("../../controllers/stocksController");

// Matches with "/api/nyt"
router
  .route("/")
  .get(stocksController.findAll);

module.exports = router;






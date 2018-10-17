const router = require("express").Router();
const articleController = require("../../controllers/articleController");
const scraper = require ('../../controllers/scrapper')




// Matches with "/api/articles"
router.route("/")
// the below are routes
//controller is going to give u find all
  .get(scraper.logPosts)
  .post(articleController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);

module.exports = router;

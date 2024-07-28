const express = require("express");
const moviesController = require("./../Controller/moviesController");

const router = express.Router();

router.param("id", moviesController.checkId);

router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.validateBody, moviesController.createMovies);

router
  .route("/:id")
  .get(moviesController.getAMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

module.exports = router;

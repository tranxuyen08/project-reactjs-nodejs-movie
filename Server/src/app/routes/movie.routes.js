const express = require("express");
const router = express.Router();
const {MovieProductsController} = require("../controllers/movie.controller");

router.get('/search', MovieProductsController.handleSearchTitle);
router.post('/add-movie', MovieProductsController.handleAddMovie);
// router.get('/', MovieProductsController.handleGetMovie);
router.get('/popular', MovieProductsController.handleGetPopular);
router.get('/rate', MovieProductsController.handleGetRate);
router.get('/:id', MovieProductsController.handleGetMovieDetails);
router.get('/', MovieProductsController.handleGetAllMoviePagination)
router.delete('/:id', MovieProductsController.handleDeleteMovie);
router.patch('/:id', MovieProductsController.handleUpdateMovie);


module.exports = router;
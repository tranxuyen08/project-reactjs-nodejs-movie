const express = require("express");
const router = express.Router();
const {FavoriteController} = require('../controllers/favorite.controller')
const checkAuthor = require('../middlewares/checkAuth')


router.post('/',checkAuthor,FavoriteController.handleLikeMovie)
router.get('/',checkAuthor, FavoriteController.handleGetLikeMovie)
router.delete('/:id', checkAuthor,FavoriteController.handleDeleteFavorite)

module.exports = router;

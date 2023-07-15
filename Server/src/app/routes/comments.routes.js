const express = require("express");
const router = express.Router();
const {CommentsController} = require('../controllers/comments.controller')
const checkAuthor = require('../middlewares/checkAuth')

router.post('/',checkAuthor, CommentsController.handlePostComments)
router.get('/', CommentsController.handleGetComment)

module.exports = router;

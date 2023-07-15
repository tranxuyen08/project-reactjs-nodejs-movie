const CommentsModel = require('../models/coments.model');

class CommentsController {
  async handlePostComments(req, res) {
    const idUser = req.userId; // id của người dùng từ checkAuther được gửi lên
    const { idMovie, titleComment } = req.body;
    try {
      const newComment = new CommentsModel({ idUser, idMovie, titleComment });
      await newComment.save();
      res.status(200).json({ message: 'Comment posted successfully' });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async handleGetComment(req,res){
    try {
      const commentsAll = await CommentsModel.find().populate('idUser')
      res.status(200).json({ data: commentsAll })
    } catch (error) {
      res.status(500).json({ msg: "Server loi" })
    }
  }
}

module.exports = {
  CommentsController: new CommentsController(),
};

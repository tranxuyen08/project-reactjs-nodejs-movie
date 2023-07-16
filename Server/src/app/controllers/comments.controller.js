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
  
  async handleGetComment(req, res) {
    try {
      const movieId = req.params.id; // Lấy id của bộ phim từ request params (ví dụ: "/comments/:movieId")

      const comments = await CommentsModel.find({ idMovie: movieId }).populate('idUser');
      res.status(200).json({ data: comments });
    } catch (error) {
      res.status(500).json({ msg: "Lỗi máy chủ" });
    }
  }
}

module.exports = {
  CommentsController: new CommentsController(),
};

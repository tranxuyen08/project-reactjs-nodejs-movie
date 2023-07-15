const Favorite = require('../models/favorite.model');

class FavoriteController {
  async handleLikeMovie(req, res) {
    const idUser = req.userId;  // id của người dùng từ checkAuther được gửi lên
    const { idMovie } = req.body;
    try {
      const checkFavorite = await Favorite.findOne({ idUser, idMovie }).populate('idMovie');

      if (checkFavorite) {
        await checkFavorite.deleteOne();
        res.status(200).json({ message: 'Loại bỏ khỏi danh sách yêu thích thành công' });
      } else {
        // Bộ phim chưa được user like
        const newFavorite = new Favorite({ idUser, idMovie });
        await newFavorite.save();
        res.status(200).json({ message: 'The movie has been added to the favorites list' });
      }
    } catch (err) {
      // Xử lý lỗi nếu có
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  async handleGetLikeMovie(req, res) {
    const idUser = req.userId;  // id của người dùng từ checkAuther được gửi lên
    try {
      const favoriteMovies = await Favorite.find({ idUser }).populate('idMovie');
      res.status(200).json({ favoriteMovies });
    } catch (err) {
      // Xử lý lỗi nếu có
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  async handleDeleteFavorite(req, res) {
    const idUser = req.userId;
    try {
      const deleteFavoriteMovie = await Favorite.deleteOne({ idUser }).populate('idMovie')
      res.status(200).json({ deleteFavoriteMovie })
    }
    catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = {
  FavoriteController: new FavoriteController(),
};

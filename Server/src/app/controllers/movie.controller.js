const Movie = require('../models/productsMovie.model');

class MovieProductsController {
  async handleAddMovie(req, res) {
    const { title, vote_average, release_date, overview, video, typeMovie, backdrop_path, poster, role_movie, popularity } = req.body;
    try {
      // Kiểm tra phim tồn tại chưa
      const movie = await Movie.findOne({ title });
      // Nếu phim đã tồn tại, báo lỗi
      if (movie) {
        return res.status(400).json({ msg: 'Movie already exists' });
      }
      const newMovie = new Movie({ title, vote_average, release_date, overview, video, typeMovie, backdrop_path, poster, role_movie, popularity });
      await newMovie.save(); // Lưu dữ liệu
      res.status(200).json({ msg: 'Add Movie Successfully' });
    } catch (err) {
      // Lỗi server
      console.error('Error handling add movie:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async handleGetMovie(req, res) {
    try {
      const movieAll = await Movie.find()
      res.status(200).json({ data: movieAll })
    } catch (error) {
      res.status(500).json({ msg: "Server loi" })
    }
  }
  async handleGetMovieDetails(req, res) {
    try {
      const movieDetail = await Movie.findById(req.params.id)
      res.status(200).json({ data: movieDetail })
    } catch (error) {
      res.status(500).json({ msg: "Server loi" })
    }
  }
  async handleDeleteMovie(req, res) {
    try {
      const movieDelete = await Movie.deleteOne({ _id: req.params.id })
      res.status(200).json({ data: movieDelete })
    }
    catch (error) {
      res.status(500).json({ msg: "Server loi" })
    }
  }
  //delete all
  async handleDeleteAllMovie(req, res) {
    try {
      const movieDelete = await Movie.deleteMany({ _id: req.params.id });
      res.status(200).json({ data: movieDelete });
    } catch (error) {
      res.status(500).json({ msg: "Lỗi server" });
    }
  }
  async handleUpdateMovie(req, res) {
    const { title, vote_average, release_date, overview, video, typeMovie, backdrop_path, poster, role_movie, popularity } = req.body;
    try {
      // Tìm và cập nhật bộ phim dựa trên ID sử dụng Mongoose
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          title,
          vote_average,
          release_date,
          overview,
          video,
          typeMovie,
          backdrop_path,
          poster,
          role_movie,
          popularity,
        },
        { new: true } // Trả về bộ phim đã được cập nhật
      );

      if (updatedMovie) {
        res.status(200).json({ data: updatedMovie });
      } else {
        res.status(404).json({ msg: "Không tìm thấy bộ phim" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Lỗi server" });
    }
  }
  async handleGetPopular(req, res) {
    try {
      const popularMovie = await Movie.find().sort({
        popularity: -1
      }).limit(5)
      res.status(200).json({ data: popularMovie });
    } catch (err) {
      // Lỗi server
      console.error('Error handling add movie:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async handleGetRate(req, res) {
    try {
      const rateMovie = await Movie.find().sort({
        vote_average: -1
      }).limit(5)
      res.status(200).json({ data: rateMovie });
    } catch (err) {
      // Lỗi server
      console.error('Error handling add movie:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async handleSearchTitle(req, res) {
    const { searchTerm } = req.query
    try {
      const movies = await Movie.find(
        { title: { $regex: searchTerm, $options: 'i' } }
        // title: Đại diện cho trường mà bạn muốn tìm kiếm (trong ví dụ này là trường "title").
        // $regex: Là toán tử trong truy vấn MongoDB để sử dụng biểu thức chính quy (regex) cho tìm kiếm.
        // searchTerm: Đại diện cho chuỗi tìm kiếm mà bạn muốn so khớp với trường "title".
        // $options: 'i': Là tùy chọn để không phân biệt chữ hoa/chữ thường trong quá trình tìm kiếm.
      );
      res.json(movies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
}

module.exports = {
  MovieProductsController: new MovieProductsController(),
};

const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const sceretKey = require('../../configs/jwtConfigs')
var bcrypt = require('bcryptjs');

class UserController {
  async handleRegister(req, res) {
    const { firstName, lastName, email, password } = req.body;

    try {
      // Kiểm tra email đã tồn tại chưa
      const user = await User.findOne({ email });
      // Nếu email đã tồn tại, báo lỗi
      if (user) {
        return res.status(400).json({ msg: 'Email already exists' });
      }
      // Trường hợp email chưa tồn tại
      const saltRounds = 10; // Độ an toàn mã hóa của password
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt); // Mã hóa password
      const newUser = new User({ firstName, lastName, email, password: hashedPassword });
      await newUser.save(); // Lưu dữ liệu

      res.status(200).json({ msg: 'Register Successfully' });
    } catch (error) {
      // Lỗi server
      console.error('Error handling register:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async handleLogin(req, res) {
    const { email, password } = req.body;
    try {
      // Kiểm tra email và trả về toàn bộ dữ liệu người dùng
      const user = await User.findOne({ email });
      // Nếu có người dùng, so sánh password bằng hàm compare
      if (user) {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (isPasswordMatched) {
          const accessToken = jwt.sign(user.toJSON(), sceretKey);
          res.status(200).json({
            data: user,
            accessToken
          });
        } else {
          // Nếu sai mật khẩu, báo lỗi
          res.status(401).json({ msg: "Incorrect password" });
        }
      } else {
        // Nếu không tìm thấy người dùng, báo lỗi
        res.status(401).json({ msg: "Email does not exist" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
  async handleUpdateUser(req, res) {
    const {firstName,lastName, email, password, role_admin, role_subscription, avatar } = req.body;
    try {
      // Tìm và cập nhật bộ phim dựa trên ID sử dụng Mongoose
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          firstName,
          lastName,
          email,
          password,
          role_admin,
          role_subscription,
          avatar
        },
        { new: true } // Trả về bộ phim đã được cập nhật
      );

      if (updatedUser) {
        res.status(200).json({ data: updatedUser });
      } else {
        res.status(404).json({ msg: "Không tìm thấy bộ phim" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Lỗi server" });
    }
  }
  //[GET] /:slug
  // show(req, res, next) {
  //   Blog.findOne({ id })
  //     .lean()
  //     .then((item) => {
  //       res.json({ item });
  //     })
  //     .catch(next);
  // }

  // [GET] /create
  create(req, res, next) {
    User.find({})
      .lean()
      .then((blogs) => res.json({ blogs }))
      .catch(next);
  }
  // //[DELETE]
  //   delete(req, res, next) {
  //     Blog.deleteOne({ _id: req.params.id })
  //       .then(() => res.redirect("back"))
  //       .catch(next);
  //   }
  //   //[POST] /profile/store
  //   store(req, res, next) {
  //     const blog = new Blog(req.body);
  //     blog
  //       .save()
  //       .then(() => res.redirect("/"))
  //       .catch(next);
  //   }
}

module.exports = {
  UserController: new UserController(),
};

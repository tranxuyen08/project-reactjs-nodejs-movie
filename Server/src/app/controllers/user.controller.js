const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const sceretKey = require('../../configs/jwtConfigs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('avatar');

class UserController {
  async handleUploadImage(req, res) {
    try {
      if (req.file) {
        const user = await User.findById(req.params.id);
        if (user) {
          user.avatar = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
          await user.save();
          res.status(200).json({ data: user });
        } else {
          res.status(404).json({ msg: 'User not found' });
        }
      } else {
        res.status(400).json({ msg: 'No image selected' });
      }
    } catch (err) {
      console.error('Error handling upload image:', err);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
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
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json({ msg: 'Error uploading image' });
      } else if (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message });
      }
    })
    const { firstName, lastName, email, password, role_admin, role_active, role_subscription, avatar } = req.body;
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
          role_active,
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
  // [GET] /create
  create(req, res, next) {
    User.find({})
      .lean()
      .then((blogs) => res.json({ blogs }))
      .catch(next);
  }
  async handleGetUserId(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findById(id).lean();
      if (user) {
        res.json({ user });
      } else {
        res.status(404).json({ msg: "User not found" });
      }
    } catch (error) {
      console.error("Error handling get user by ID:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
}




module.exports = {
  UserController: new UserController(),
  upload: upload,
}

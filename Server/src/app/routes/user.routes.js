const express = require("express");
const router = express.Router();
// const UserController = require("../controllers/user.controller");
const { dropCollection, UserController, upload } = require("../controllers/user.controller");


//drop collection
// router.get("/drop-collection", async (req, res, next) => {
//   try {
//     await dropCollection();
//     res.send("Đã drop collection thành công");
//   } catch (error) {
//     next(error);
//   }
// });


router.post("/register", UserController.handleRegister);
router.post("/login", UserController.handleLogin);
router.get("/", UserController.create);
router.get("/:id", UserController.handleGetUserId);
router.patch('/update/:id', UserController.handleUpdateUser)

router.post('/upload-one/:id', upload, UserController.handleUploadImage);


//upload image
router.post('/upload-one')
router.post('/upload-many')

module.exports = router;

const jwt = require('jsonwebtoken')
const sceretKey = require('../../configs/jwtConfigs')

const checkAuthentication = (req,res,next) => {
  // get phần header api (header + body)
  const authHeader = req.header('Authorization')
  //Bearer Accesstoken

  const token = authHeader && authHeader.split(" ")[1]

  //nếu k có token => lỗi
  if(!token) res.sendStatus(401)
  try {
      const decoded = jwt.verify(token,sceretKey)
      console.log("decoded",decoded);
      // Nếu mà token đúng thì next()
      req.userId = decoded._id
      next()
  } catch (error) {
      //lỗi accessToken k chính xác
     return res.sendStatus(403)
  }
}

module.exports = checkAuthentication
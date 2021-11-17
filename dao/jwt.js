// token
var jwt = require('jsonwebtoken')
const secret = 'easyzuishuai'

exports.generateToken = (res) => {
  let payload = {
    id: res.id,
    time: new Date(),
  }
  let token = jwt.sign(payload, secret, { expiresIn: 60*60*24 })
  return token
}

// 解码
exports.verifyToken = (e) => {
  let payload = jwt.verify(e, secret)

  return payload
}
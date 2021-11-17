var bcrypt = require('bcryptjs')

// 生成hash密码
exports.encryption = (e) => {
  let salt = bcrypt.genSaltSync(10)

  let hash = bcrypt.hashSync(e, salt)

  return hash
}

// 解密
exports.verification = (e, hash) => {
  let isSame = bcrypt.compareSync(e, hash)

  return isSame
}
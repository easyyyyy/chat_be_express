var dbserver = require('../dao/dbsever')

// 用户注册
exports.register = (req, res) => {
  let name = req.body.name
  let email = req.body.email
  let pwd = req.body.pwd

  dbserver.addUser(name, email, pwd, res)
}

// 用户或邮箱是否占用判断
exports.judgeValue = (req, res) => {
  let data = req.body.data
  let type = req.body.type

  dbserver.countUserValue(data, type, res)
}

exports.signin = (req, res) => {
  let data = req.body.data
  let pwd = req.body.pwd

  dbserver.signInUser(data, pwd, res)
}
var dbserver = require('../dao/dbsever')

// 用户详情
exports.userDetails = (req, res) => {
  let id = req.body.id

  dbserver.userDetails(id, res)
}

// 用户信息修改
exports.userUpdate = (req, res) => {
  let data = req.body

  dbserver.userUpdate(data, res)
}

// 修改好友昵称
exports.friendNickName = (req, res) => {
  let data = req.body

  dbserver.friendNickName(data, res)
}

// 获取好友昵称
exports.getfriendNickName = (req, res) => {
  let data = req.body

  dbserver.getfriendNickName(data, res)
}


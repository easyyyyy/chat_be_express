var dbserver = require('../dao/dbsever')

// 搜索用户
exports.searchUser = (req, res) => {
  let data = req.body.data
  dbserver.searchUser(data, res)
}

// 判断是否为好友
exports.isFriend = (req, res) => {
  let uid = req.body.uid
  let fid = req.body.fid

  dbserver.isFriend(uid, fid, res)
}

// 搜索群
exports.searchGroup = (req, res) => {
  let data = req.body.data
  dbserver.searchGroup(data, res)
}

// 判断是否为好友
exports.isInGroup = (req, res) => {
  let uid = req.body.uid
  let fid = req.body.gid

  dbserver.isInGroup(uid, fid, res)
}
var dbserver = require('../dao/dbsever')

// 好友申请
exports.applyFriend = function(req, res) {
  let data = req.body
  dbserver.applyFriend(data, res)
}

// 好友状态更新
exports.updateFriendState = function(req, res) {
  let data = req.body
  dbserver.updateFriendState(data, res)
}
var express = require('express');
var router = express.Router();

// 好友服务
var friendService = require('../service/friendService')

// 好友申请
router.post('/apply', (req, res) => {
  friendService.applyFriend(req, res)
})

// 好友状态修改
router.post('/state', (req, res) => {
  friendService.updateFriendState(req, res)
})


module.exports = router;
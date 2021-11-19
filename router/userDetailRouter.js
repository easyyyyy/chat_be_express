var express = require('express');
var router = express.Router();
var dbserver = require('../dao/dbsever')

// 注册页面服务
var userDetailService = require('../service/userDetailService')

// 详情
router.post('/details', (req, res) => {
  userDetailService.userDetails(req, res)
})

// 用户信息修改
router.post('/update', (req, res) => {
  userDetailService.userUpdate(req, res)
})

// 用户昵称修改
router.post('/nickname', (req, res) => {
  userDetailService.friendNickName(req, res)
})

module.exports = router;

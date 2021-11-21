var express = require('express');
var router = express.Router();
var dbserver = require('../dao/dbsever')
// 注册页面服务
var userService = require('../service/userService')

// 注册
router.post('/register', (req, res) => {
  userService.register(req, res)
})
// 登录
router.post('/signin', (req, res) => {
  userService.signin(req, res)
})

module.exports = router;
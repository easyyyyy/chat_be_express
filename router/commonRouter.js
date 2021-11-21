var express = require('express');
var router = express.Router();
var dbserver = require('../dao/dbsever')
// 注册页面服务
var userService = require('../service/userService')
// 搜索页面服务
var searchService = require('../service/searchService')
// 用户详情服务
var userDetailService = require('../service/userDetailService')
// 好友服务
var friendService = require('../service/friendService')

// 注册
router.post('/register', (req, res) => {
  userService.register(req, res)
})
// 登录
router.post('/signin', (req, res) => {
  userService.signin(req, res)
})

// 搜索用户
router.post('/user', (req, res) => {
  searchService.searchUser(req, res)
})
// 是否为好友
router.post('/isFriend', (req, res) => {
  searchService.isFriend(req, res)
})
// 搜索群
router.post('/group', (req, res) => {
  searchService.searchGroup(req, res)
})
// 是否在群里
router.post('/isInGroup', (req, res) => {
  searchService.isInGroup(req, res)
})

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

// 好友申请
router.post('/apply', (req, res) => {
  friendService.applyFriend(req, res)
})
// 好友状态修改
router.post('/state', (req, res) => {
  friendService.updateFriendState(req, res)
})

module.exports = router;

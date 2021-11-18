var express = require('express');
var router = express.Router();

// 搜索页面服务
var searchService = require('../service/searchService')

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

module.exports = router;

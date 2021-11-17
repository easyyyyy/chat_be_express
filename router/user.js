var express = require('express');
var router = express.Router();
var dbserver = require('../dao/dbsever')

/* GET home page. */
router.get('/test', function(req, res, next) {
  dbserver.findUser(res)
});

module.exports = router;

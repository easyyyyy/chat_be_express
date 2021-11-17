const mongoose = require('mongoose');
mongoose.connect('mongodb://dbadmin:12345678@114.55.252.36:27017/test?authSource=admin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.info('数据库打开成功')
});

module.exports = db
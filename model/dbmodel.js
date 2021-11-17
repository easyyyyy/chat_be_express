var mongoose = require('mongoose')
var db = require('../config/db')
var Schema = mongoose.Schema

// 用户表
const UserSchema = new Schema({
  name: { type: String },                         // 用户名
  pwd: { type: String },                          // 密码
  email: { type: String },                        // 邮箱
  sex: { type: String, default: 'asexual' },      // 性别
  birth: { type: Date },                          // 生日
  phone: { type: String },                        // 电话
  explain: { type: String },                      // 签名
  imgUrl: { type: String },                       // 头像
  register: { type: Date }                        // 注册时间
})
module.exports =  db.model('User', UserSchema)
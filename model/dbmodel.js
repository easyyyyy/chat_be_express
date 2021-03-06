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
  registerTime: { type: Date }                        // 注册时间
})

// 好友表
const FriendSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref:'User' },                         // 用户id
  fid: { type: Schema.Types.ObjectId, ref:'User' },                         // 好友id
  state: { type: String },                          // 好友状态(0已经为好友，1申请中，2申请发送方)
  time: { type: Date },                          // 生成时间
  lastTime: { type: Date }                        // 最后发送时间
})

// 一对一消息表
const MessageSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref:'User' },                         // 用户id
  fid: { type: Schema.Types.ObjectId, ref:'User' },                         // 好友id
  message: { type: String },                          // 消息内容
  type: { type: String },                          // 消息类型(0文字，1图片链接，2音频链接)
  time: { type: Date },                          // 发送时间
  state: { type: String },                          // 接收状态(0未读，1已读)
})

// 群表
const GroupSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref:'User' },                         // 用户id
  name: { type: String },                          // 群名
  imgUrl: { type: String },                       // 群头像
  time: { type: Date },                          // 发送时间
  notice: { type: String },                          // 群公告
})

// 群成员表
const GroupMemberSchema = new Schema({
  gid: { type: Schema.Types.ObjectId, ref: 'Group' },
  uid: { type: Schema.Types.ObjectId, ref:'User' },                         // 用户id
  name: { type: String },                          // 群昵称
  tip: { type: Number, default: 0 },              // 未读消息数
  time: { type: Date },                          // 加入时间
  shield: { type: Number },                          // 是否屏蔽(0不屏蔽，1屏蔽)
})

// 群消息表
const GroupMsgSchema = new Schema({
  gid: { type: Schema.Types.ObjectId, ref: 'Group' },
  uid: { type: Schema.Types.ObjectId, ref:'User' },                         // 用户id
  message: { type: String },                          // 消息内容
  type: { type: String },                          // 消息类型(0文字，1图片链接，2音频链接)
  time: { type: Date },                          // 发送时间
  state: { type: String },                          // 接收状态(0未读，1已读)
})

module.exports =  db.model('User', UserSchema)
module.exports =  db.model('Friend', FriendSchema)
module.exports =  db.model('Message', MessageSchema)
module.exports =  db.model('Group', GroupSchema)
module.exports =  db.model('GroupMember', GroupMemberSchema)
module.exports =  db.model('GroupMsg', GroupMsgSchema)
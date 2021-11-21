var bcrypt = require('./bcrypt')

var jwt = require('../dao/jwt')

var dbmodel = require('../model/dbmodel')
var User = dbmodel.model('User')
var Friend = dbmodel.model('Friend')
var Group = dbmodel.model('Group')
var GroupMember = dbmodel.model('GroupMember')
var Message = dbmodel.model('Message')

// 注册
exports.addUser = function(name, email, pwd, res) {
  let wherestr = { $or:[{
    name: name
  }, {
    email: email
  }] }
  User.find(wherestr, {}, (err, result) => {
    if(err) {
      res.send({status: 500})
    }
    if(result != '') {
      res.send({
        status: 400,
        msg: '用户名或邮箱已被占用'
      })
    } else {
      let password = bcrypt.encryption(pwd)

      let data = {
        name,
        pwd: password,
        email,
        registerTime: new Date()
      }

      let user = new User(data)

      user.save((err, result) => {
        if(err) {
          res.send({status: 500})
        } else {
          console.info("注册成功")
          res.send({status: 200})
        }
      })
    }
  })
}

// 匹配用户元素个数
exports.countUserValue = (data, type, res) => {
  let m = {}
  m[type] = data

  User.countDocuments(m, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

// 用户验证
exports.signInUser = function(data, pwd, res) {
  let wherestr = { $or:[{
    name: data
  }, {
    email: data
  }] }
  let out = {
    name: 1,
    imgUrl: 1,
    pwd: 1
  }
  User.find(wherestr, out, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      if(result == '') {
        res.send({
          status: 400,
          msg: '该用户还没有注册'
        })
      }
      result.forEach((e) => {
        const pwdMatch = bcrypt.verification(pwd, e.pwd)
        if(pwdMatch) {
          let token = jwt.generateToken({id: e._id})
          let data = {
            id: e._id,
            name: e.name,
            imgUrl: e.imgUrl,
          }
          res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            // domain: 'localhost',
            path: '/',
            maxAge: 14*86400000,
          })
          res.send({status: 200, data})
        }
      })
    }
  })
}

// 搜索用户
exports.searchUser = function(data, res) {
  let wherestr = {$or: [{ name: data }, { email: data }]}
  let out = {
    name: 1,
    email: 1,
    imgUrl: 1
  }
  User.find(wherestr, out, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      res.send({
        status: 200,
        result
      })
    }
  })
}

// 判断是否为好友
exports.isFriend = function(uid, fid, res) {
  let wherestr = { uid, fid }
  Friend.findOne(wherestr, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      if(result) {
        res.send({status: 200})
      } else {
        res.send({status: 400})
      }
    }
  })
}

// 搜索群
exports.searchGroup = function(data, res) {
  let wherestr = {$or: [{ name: data }]}
  let out = {
    name: 1,
    imgUrl: 1
  }
  Group.find(wherestr, out, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      res.send({
        status: 200,
        result
      })
    }
  })
}

// 判断是否在群里
exports.isInGroup = function(uid, gid, res) {
  let wherestr = { uid, gid }
  GroupMember.findOne(wherestr, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      if(result) {
        res.send({status: 200})
      } else {
        res.send({status: 400})
      }
    }
  })
}

// 用户详情
exports.userDetails = function(id, res) {
  let wherestr = { _id: id }
  let out = {
    pwd: 0
  }
  User.findOne(wherestr, out, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

// 用户信息修改
exports.userUpdate = function(data, res) {
  let updatestr = {}

  // 判断是否有密码
  if(typeof(data.pwd) != 'undefined') {
    // 有密码匹配
    User.find({ _id: data.id}, {pwd: 1}, (err, result) => {
      if(err) {
        res.send({status: 500})
      } else {
        if(result == '') {
          res.send({
            status: 400,
            msg: '该用户还没有注册'
          })
        }
        result.forEach((e) => {
          const pwdMatch = bcrypt.verification(data.pwd, e.pwd)
          if(pwdMatch) {
            if(data.type == 'pwd') {
              let password = bcrypt.encryption(data.data)
              updatestr[data.type] = password
            } else {
              updatestr[data.type] = data.data
            }
            User.findByIdAndUpdate(data.id, updatestr, (err, result) => {
              if(err) {
                res.send({status: 500})
              } else {
                res.send({status: 200, result})
              }
            })
          } else {
            res.send({status: 401, msg: '密码匹配失败'})
          }
        })
      }
    })
  } else {
    User.findByIdAndUpdate(data.id, updatestr, (err, result) => {
      if(err) {
        res.send({status: 500})
      } else {
        res.send({status: 200, result})
      }
    })
  }
}

// 修改好友昵称
exports.friendNickName = function(data, res) {
  let wherestr = { uid: data.uid, fid: data.fid }
  let updatestr = { nickname: data.name }
  Friend.updateOne(wherestr, updatestr, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
  })
}

// 获取好友昵称
exports.getfriendNickName = function(data, res) {
  let wherestr = { uid: data.uid, fid: data.fid }
  let out = { nickname: 1 }
  Friend.findOne(wherestr, out, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      res.send({status: 200, result})
    }
  })
}

// 添加好友表
exports.addFriend = function(uid, fid, state, res) {
  let data = {
    uid,
    fid,
    state,
    time: new Date(),
    lastTime: new Date()
  }
  let friend = new Friend(data)

  friend.save((err, result) => {
    if(err) {
      //res.send({status: 500})
      console.log('申请好友表出错')
    } else {
      //res.send({status: 200})
    }
  })
}

// 好友最后通讯时间
exports.updateFriendLastTime = function (uid, fid) {
  let wherestr = { $or:[{uid: uid, fid: fid}, {uid: fid, fid: uid}] }
  let updatestr = { lastTime: new Date() }

  Friend.updateMany(wherestr, updatestr, (err, result) => {
    if(err) {
      //res.send({status: 500})
      console.log('好友最后通讯时间出错')
    } else {
      //res.send({status: 200})
    }
  })
}

//添加一对一消息
exports.addMsg = function (uid, fid, msg, types, res) {
  let data = {
    uid,
    fid,
    message: msg,
    types,
    time: new Date(),
    state: 0,
  }

  let message = new Message(data)

  message.save((err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
  })
}

// 好友申请
exports.applyFriend = function(data, res) {
  let wherestr = { uid: data.uid, fid: data.fid }
  Friend.countDocuments(wherestr, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      // 判断是否初次申请过
      if( result == 0) {
        this.addFriend(data.uid, data.fid, 2)
        this.addFriend(data.fid, data.uid, 1)
      } else {
        this.updateFriendLastTime(data.uid, data.fid)
      }
      const { uid, fid, msg } = data
      this.addMsg(uid, fid, msg, 0, res)
    }
  })
}

// 更新好友状态
exports.updateFriendState = function(data, res) {
  const {uid, fid, state} = data
  let wherestr = { $or:[{uid: uid, fid: fid}, {uid: fid, fid: uid}] }
  let updatestr = { state: state }
  Friend.updateMany(wherestr, updatestr, (err, result) => {
    if(err) {
      res.send({status: 500})
    } else {
      res.send({status: 200})
    }
  })
}

// 获取好友
exports.findUser = function(res) {
  User.find((err, val) => {
    if(err) {
      console.log('用户数据查找失败!' + err)
    } else {
      res.send(val)
    }
  })
}


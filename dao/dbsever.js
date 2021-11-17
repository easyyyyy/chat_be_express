var bcrypt = require('./bcrypt')

var jwt = require('../dao/jwt')

var dbmodel = require('../model/dbmodel')
var User = dbmodel.model('User')

// 注册
exports.addUser = (name, email, pwd, res) => {
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
exports.signInUser = (data, pwd, res) => {
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
            token: token
          }
          res.send({status: 200, data})
        }
      })
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
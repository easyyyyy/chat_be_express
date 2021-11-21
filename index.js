const express = require('express')
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
// var indexRouter = require('./router/index');
// var userRouter = require('./router/userRouter')
// var searchRouter = require('./router/searchRouter')
// var friendRouter = require('./router/friendRouter')
const commonRouter = require('./router/commonRouter')
const authRouter = require('./router/authRouter')
const auth = require('./middleware/auth')

var jwt = require('./dao/jwt')
const app = express()
const port = 3000

// 跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Contril-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  if(res.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next();
  }
});

// 解析前端数据
app.use(bodyParser.json())

// 获取cookie数据
app.use(cookieParser())

// token判断
// app.use((req, res, next) => {
//   console.log(req.cookies)
//   console.log(req.cookies.token)
//   if(typeof(req.cookies.token) != 'undefined') {
//     let token = req.cookies.token
//     //console.log(token)
//     let tokenMatch = jwt.verifyToken(token)
//     if(tokenMatch == 1) {
//       next()
//     } else {
//       res.send({status: 401, msg: '登录失效'})
//     }
//   } else {
//     next()
//   }
// })

app.use('/api/auth', authRouter)
app.use('/api/common', auth, commonRouter)

app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message)
})

app.listen(port, () => {
  console.log(`listen at port: ${port}`)
})
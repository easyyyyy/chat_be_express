const express = require('express')
var bodyParser = require('body-parser')
var indexRouter = require('./router/index');
var userRouter = require('./router/user')
var searchRouter = require('./router/search')

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

// token判断
app.use((req, res, next) => {
  if(typeof(req.body.token) != 'undefined') {
    let token = req.body.token
    let tokenMatch = jwt.verifyToken(token)
  } else {
    next()
  }
})

//app.get('/', (req, res) => res.send('你好'))
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter);

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
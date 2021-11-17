const express = require('express')
var indexRouter = require('./router/index');
var userRouter = require('./router/user')
const app = express()
const port = 3000

// 跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//app.get('/', (req, res) => res.send('你好'))
app.use('/', indexRouter);
app.use('/user', userRouter);

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
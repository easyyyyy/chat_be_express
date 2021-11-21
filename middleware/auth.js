var jwt = require('../dao/jwt')

const auth = (req, res, next) => {
  /**
   * 这里做一些逻辑判断，可能是校验session_id或者token，下面会说到
   * 校验通过正常放行或者响应数据
   * 校验不通过则直接返回错误信息
   * */ 
  console.log(req.cookies)
  if(typeof(req.cookies.token) != 'undefined') {
  let token = req.cookies.token
  //console.log(token)
  let tokenMatch = jwt.verifyToken(token)
  if(tokenMatch == 1) {
    next()
  } else {
    res.send({status: 401, msg: '登录失效'})
  }
  } else {
    res.send({status: 401, msg: '登录失效'})
  }
}

module.exports = auth
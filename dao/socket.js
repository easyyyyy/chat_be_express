module.exports = function(io) {
  var users = {}
  io.on('connection', (socket) => {
    socket.on('login', (id) => {
      console.log(socket.id)
      socket.name = id
      users[id] = socket.id
      socket.emit('login', socket.id)
    })

    // 用户一对一发送
    socket.on('msg', (msg, fromid, toid) => {
      console.log(msg)
      socket..to(users[toid]).emit('msg', msg)
    })

    //用户离开
    socket.on('disconnecting', () => {
      if(users.hasOwnProperty(socket.name)) {
        delete users[socket.name]
      }
      console.log(socket.id + '离开')
    })
  })
}
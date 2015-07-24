#server
engine = require 'engine.io'
server = engine.listen 8845

id = 0

server.on 'connection', (socket) ->
  console.log socket.id + ' connect'
  intervalId = setInterval ->
    date = new Date()
    socket.send date
    console.log date
  , 1000 * 60

  socket.on 'message', (data) ->
    console.log socket.id + ' connect'
  .on 'close', ->
    console.log socket.id + ' close'
    clearInterval intervalId
  .on 'error', ->
    console.log socket.id + ' error'

console.log 'server listening on port 8845'

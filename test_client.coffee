eio = require 'engine.io-client'

connect = ->
  socket = eio 'ws://localhost:8845/engine.io'
  socket.on 'error', (err) ->
    console.log 'error: ' + err + new Date()
    socket.close
  .on 'open', ->
    console.log 'open: ' + new Date()
    socket.on 'message', (data) ->
      console.log 'message: ' + data
    .on 'close', ->
      console.log 'close'
      setTimeout ->
        connect()
      , 3000

connect()

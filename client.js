/**client**/

var appKey = '41Raz6ZK'
var deviceToken = '1234'
var request = require('request')
var eio = require('engine.io-client')
var userId =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWIwOTg4MDRiYWE3OTYxM2FmMzcwNDYiLCJpYXQiOjE0Mzc2MzY3MzYsImV4cCI6MTQzODg0NjMzN30.xHKb8i_2mg-t_nYIoSeqyIPHt6O42s7Xip4lacn02fg"

function makeRequest() {
  request.post('http://ps.project.ci/v1/users/register', {
    form: {
      appKey: appKey,
      deviceToken: deviceToken
    }
  }, function(error, res, body) {
    if (!error && res.statusCode == 200) {
      console.log(body)
      var json = JSON.parse(body)
      userId = json.userId
      connect(userId)
    }
  })
}

function connect(uid) {
  if (!uid) {
    connect(userId)
    return;
  }

  console.log('start open!')
  var socket = eio(('ws://ps.project.ci/engine.io?userId=' +
    uid + "&deviceToken=" + deviceToken));

  socket.on('error', function(err) {
    console.log('error: ' + err + new Date())
    socket.close()
  })

  socket.on('open', function() {
    console.log('open: ' + new Date())

    socket.on('message', function(data) {
      console.log("message:" + data)
    })
    socket.on('close', function() {
      console.log('close')
      setTimeout(function() {
        connect(userId)
      }, 3000)
    })
  })
}

module.exports.makeRequest = makeRequest

module.exports.connect = connect

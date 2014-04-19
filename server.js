var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(8000);

app.use(express.static(__dirname + '/public'));

var socks = [];
var messages = [];

io.sockets.on('connection', function (socket) {
    socks.push(socket);
    socket.on('chat', function (chat) {
        messages.push(chat);
        console.log(chat);
        socks.forEach(function(sock) {
            sock.emit('push', chat);
        });
    });
});
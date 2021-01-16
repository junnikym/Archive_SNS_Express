var bodyParser = require('body-parser');

var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var socket = require('socket.io');
var io = socket(server);

var port = 4000;
var socketList = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/chat', function(req, res) {      //대화 폼
    res.sendFile(__dirname + '/chatform.html');
});

io.on('connection', function(socket) {      //연결
    // socketList.push(socket);
    console.log('user join');

    socket.on('newUser', function(name) {
        console.log(name + '님이 접속하였습니다.');

        socket.name = name;

        io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name});
    })
    
    socket.on('SEND', function(msg) {   //메세지 전달
        console.log(msg);
        socketList.forEach(function(item, i) {
            console.log(item.id);
            if (item != socket) {
                item.emit('SEND', msg);
            }
        });
    });
    socket.on('disconnect', function() {    //접속종료
        socketList.splice(socketList.indexOf(socket), 1);
    });
});

server.listen(port, function() {
    console.log('Server On !');
});
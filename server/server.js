const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

const socketIO = require('socket.io');

var server = http.createServer(app);
var io = socketIO(server);
const publicPath = path.join(__dirname, './../public');


app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.emit('newMessage', {
        from: 'Khanh Tin',
        text: 'Hey, what is going on',
        createAt: 123
    });
    // listener from server when event occur from client
    socket.on('createMessage', (newMessage) => {
        console.log('create message', newMessage);
    })

    console.log('New user connected');
    socket.on('disconnect', (socket) => {
        console.log("Unable to connect");
    })
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
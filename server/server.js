const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;
const {
    isRealString
} = require('./utils/validation');
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message');
const socketIO = require('socket.io');
const {
    Users
} = require('./utils/user');
var server = http.createServer(app);
var io = socketIO(server);
let users = new Users();
const publicPath = path.join(__dirname, './../public');


app.use(express.static(publicPath));

io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required')
        }
        socket.join(params.room);
        // remove from past room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // socket.leave();
        //io.emit() -> io.to('The room').emit()
        // socket.broadcase.emit() -> send to the room  -> socket.broadcast.to('The room').emit()
        // socket.emit

        // socket.emit('newMessage', { ====> cause we have io.emit() every createMessage event
        //     from: 'Khanh Tin',
        //     text: 'Hey, what is going on',
        //     createAt: 123
        // });

        // socket.emit from admin text welcome to the chat app
        socket.emit('newMessage',
            generateMessage("Admin", "Welcome to the chat app"));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined`));

        callback();
    });

    // listener from server when event occur from client
    socket.on('createMessage', (newMessage, callback) => {
        console.log('create message', newMessage);
        var user = users.getUser(socket.id);
        if (user && isRealString(newMessage.text)) {
            // emit an event to every single connection
            io.to(user.room).emit('newMessage', generateMessage(
                user.name,
                newMessage.text
            ));
        }


        // socket.broadcast.emit('newMessage', generateMessage(
        //     newMessage.from,
        //     newMessage.text
        // ));
        callback();
    })

    socket.on('createLocation', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longtitude));
        }
    })

    console.log('New user connected');
    socket.on('disconnect', () => {
        console.log(socket.id);
        var user = users.removeUser(socket.id);
        if (user) {
            console.log('left');
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
        console.log("Unable to connect");
    })
});

server.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
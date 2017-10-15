const path = require('path');
const express = require('express');
const http = require('http');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const { generateMessage, generateLocationMessage } = require('./utils/message');

let app = express();
let server = http.createServer(app);
var io = require('socket.io').listen(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join',(params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('name and room needed!');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        
        socket.emit('newMessage', generateMessage('Admin','Welcome to the ChatApp'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined!`));

        callback();

    })

    socket.on('createMessage', (message,callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); 
        }
        callback('this is from the server!');
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user && coords) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude, coords.longitude));
        }
       
    })



    socket.on('disconnect', () => {
        console.log('user disconnected !!');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left room.`));
        }
    });
})

server.listen(port, () => {
    console.log(`server up and running at port ${port}`);
})
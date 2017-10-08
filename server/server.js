const path = require('path');
const express = require('express');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const { generateMessage } = require('./utils/message');

let app = express();
let server = http.createServer(app);
var io = require('socket.io').listen(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the ChatApp'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text)); 
    });

    socket.on('disconnect', () => {
        console.log('user disconnected !!');
    });
})

server.listen(port, () => {
    console.log(`server up and running at port ${port}`);
})
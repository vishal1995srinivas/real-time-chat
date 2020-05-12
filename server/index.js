const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
	console.log('We have a new conenction!!!');

	socket.on('join', ({ name, room }, callback) => {
		console.log(name, room);

		const error = true;
		if (error) {
			callback({ error: 'error' });
		}

		socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to room ${user.room}` });
		socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` });

		socket.join(user.room);
	});
	socket.on('sendMessage', (message, callback) => {
		io.to(user.room).emit('message', { user: user.name, text: message });

		callback();
	});
	socket.on('disconnect', () => {
		console.log('User has left');
	});
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started at ${PORT}`));

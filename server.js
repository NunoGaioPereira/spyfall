const express = require('express');
const app = express();
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});


app.use(express.static('public'));
app.use(
	serve_static('frontend', {
		extensions: ['html'],
		dotfiles: 'deny', // strictly deny all access to any directory containing a "." in case we want to hide files
		index: ['index.html']
	})
);

var rooms = {};

var io = socket(server);

io.on('connection', (socket) => {
	socket.on('create_room', data => {});

	socket.on('join_room', data => {
		// if the room doesn't exist...
		if (!rooms[data.join_key]) {
			return io.to(data.source_socket).emit('no_key_error', data.join_key);
		} else {
			io.to(data.source_socket).emit('join', {
				back_data: data,
				key: data.join_key
			});
		}
	});


	socket.on('load_players', data => {});
	socket.on('start_game', data => {});
	socket.on('stop_game', data => {});
	socket.on('pause_game', data => {});
	socket.on('disconnect', data => {});
});




// Create unique five letter room key
function keyCreator() {
	let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

	let temp_key =
		alphabet[Math.floor(Math.random() * 25)] +
		alphabet[Math.floor(Math.random() * 25)] +
		alphabet[Math.floor(Math.random() * 25)] +
		alphabet[Math.floor(Math.random() * 25)] +
		alphabet[Math.floor(Math.random() * 25)];

	if (rooms[temp_key]) {
		// if the key already exists, we got some nice recursion
		keyCreator();
	} else {
		// otherwise, create this area in the rooms object
		rooms[temp_key] = {};
		return temp_key;
	}
}
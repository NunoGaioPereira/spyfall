const express = require('express');
const app = express();
const fs = require('fs');
var socket = require('socket.io');

const port = process.env.PORT || 3000;

// App setup
var server = app.listen(port, function(){
    console.log('listening for requests on port 4000,');
});


app.use(express.static('content'));
// app.use(
// 	serve_static('content', {
// 		extensions: ['html'],
// 		dotfiles: 'deny', // strictly deny all access to any directory containing a "." in case we want to hide files
// 		index: ['index.html']
// 	})
// );


const json_data = JSON.parse(fs.readFileSync('./content/data.json', 'utf8'));
const num_locations = json_data.themes[0].general.locations.length;
const location_index = randomIntFromInterval(0, num_locations - 1);
const num_roles = json_data.themes[0].general.locations[location_index].professions;

console.log(json_data.themes[0].general.locations[location_index].professions)

const num_players = 8;
const spy_index = randomIntFromInterval(0, num_players - 1);
const all_spies = false;

var rooms = {};

var io = socket(server);

io.on('connection', (socket) => {
	console.log("Connected!", socket.id);
	// socket.on('create_room', data => {});

	// socket.on('join_room', data => {
	// 	// if the room doesn't exist...
	// 	if (!rooms[data.join_key]) {
	// 		return io.to(data.source_socket).emit('no_key_error', data.join_key);
	// 	} else {
	// 		io.to(data.source_socket).emit('join', {
	// 			back_data: data,
	// 			key: data.join_key
	// 		});
	// 	}
	// });


	// socket.on('load_players', data => {});
	// socket.on('start_game', data => {});
	// socket.on('stop_game', data => {});
	// socket.on('pause_game', data => {});
	// socket.on('disconnect', data => {});
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

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
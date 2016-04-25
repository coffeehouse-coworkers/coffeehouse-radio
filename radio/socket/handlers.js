'use strict';

exports.connection = function(socket){
	console.log("Socket - New Connection: " + socket.id);
	socket.emit("song.current", "SONG123");
};
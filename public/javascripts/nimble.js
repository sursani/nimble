var socket = io.connect();

socket.on('connect', function() {
	console.log('connecting to socket.io');
});

socket.on('newtweets', function(msg) {
	$('.tweets').prepend('<li>' + msg + '</li>');
});
var sio = require('socket.io');

module.exports = function(app) {
	var io = sio.listen(app);

	io.sockets.on('connection', function (socket) {
		socket.on('serverSend', function (msg, fn) {
			socket.emit('serverSend2', msg + ' bababa');
			fn();
		});
	});
};
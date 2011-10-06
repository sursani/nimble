var sio = require('socket.io');
var tweets = require('./tweets');

module.exports = function(app) {
	var io = sio.listen(app);

	io.sockets.on('connection', function (socket) {
		var downloader = new tweets.Downloader();

		downloader.on('finished', function(newtweets) {
		    console.log(newtweets);
			io.sockets.emit('newtweets', newtweets);
		});

		downloader.download('tweets here... people');
	});
};
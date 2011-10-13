var sio = require('socket.io');
var tweets = require('./tweets');

module.exports = function(app) {
	var io = sio.listen(app);

	io.sockets.on('connection', function (socket) {
		var downloader = new tweets.Downloader();

		downloader.on('finished', function(new_tweets) {
			io.sockets.emit('newtweets', new_tweets);
		});

		downloader.download();
	});
};
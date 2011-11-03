var sys = require('sys');
var sio = require('socket.io');
var tweets = require('./tweets');

module.exports = function(app) {
	var io = sio.listen(app);

	io.sockets.on('connection', function (socket) {
		var downloader = new tweets.Downloader();

		downloader.on('finished_celebrity', function (new_tweets) {
			console.log('celebrity new_tweets in finished = ' + sys.inspect(new_tweets));
			io.sockets.emit('newtweets', new_tweets);
		});
		
		downloader.on('finished_nba', function (new_tweets) {
			console.log('nba new_tweets in finished = ' + sys.inspect(new_tweets));
			io.sockets.emit('newtweets', new_tweets);
		});

		downloader.download();
	});
};
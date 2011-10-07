var showNewTweets = function (tweets) {
	for (var i=0; i<tweets.length; i++) {
		$('.tweets').prepend('<li>' + tweets[i].user_name + '(' + tweets[i].full_name + '):' + tweets[i].text + '</li>');
	}
};

var showOldTweets = function (tweets) {
	for (var i=0; i<tweets.length; i++) {
		$('.tweets').append('<li>' + tweets[i].user_name + '(' + tweets[i].full_name + '):' + tweets[i].text + '</li>');
	}
};

var socket = io.connect();

socket.on('connect', function() {
	console.log('connecting to socket.io');
});

socket.on('newtweets', function (new_tweets) {
	showNewTweets(new_tweets);
});
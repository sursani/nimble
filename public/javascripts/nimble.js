var socket = io.connect();

socket.on('connect', function() {
	console.log('connecting to socket.io');
});

socket.on('newtweets', function(new_tweets) {
	for (var i=0; i<new_tweets.length; i++) {
		$('.tweets').prepend('<li>' + new_tweets[i].user_name + '(' + new_tweets[i].full_name + '):' + new_tweets[i].text + '</li>');
	}
});
var showNewTweets = function (tweets) {
	for (var i=0; i<tweets.length; i++) {
		$('#twitterstream ul').prepend(formatTweetList(tweets[i]));
	}
};

var showOldTweets = function (tweets) {
	for (var i=0; i<tweets.length; i++) {
		$('#twitterstream ul').append(formatTweetList(tweets[i]));
	}
};

function formatTweetList(data){
	return "<li id='tweet-stream'><div id='profile-image'><img src='" + data.profile_image_url + "'/></div><div id='tweet-info'><div id='user'>" + data.user_name + ' ' + 
									data.full_name + "</div><div id='text'>" + data.text + "</div></div></li>";
}

var socket = io.connect();

socket.on('connect', function() {
	console.log('connecting to socket.io');
});

socket.on('newtweets', function (new_tweets) {
	showNewTweets(new_tweets);
});
var showNewTweets = function (tweets) {
	for (var i=0; i<tweets.length; i++) {
		$('.twitterstream ul').prepend(formatTweetList(tweets[i]));
	}
};

var showOldTweets = function (tweets) {
	for (var i=0; i<tweets.length; i++) {
		$('.twitterstream ul').append(formatTweetList(tweets[i]));
	}
};

var formatTweetList = function (data) {
	return "<li class='tweet-stream'><div class='profile-image'><img src='" + data.profile_image_url + "'/></div><div class='tweet-info'><div class='user'>" + data.user_name + ' ' + data.full_name + "</div><div class='text'>" + data.text + "</div><div class='date'>" + $.timeago(new Date(data.created_on)) + "</div></div></li>";
};

var ISODateString = function (d) {
	console.log(d);
    function pad(n) {
        return n < 10 ? '0' + n : n
    }
    return d.getUTCFullYear()+'-'
    	+ pad(d.getUTCMonth()+1)+'-'
    	+ pad(d.getUTCDate())+'T'
    	+ pad(d.getUTCHours())+':'
    	+ pad(d.getUTCMinutes())+':'
    	+ pad(d.getUTCSeconds())+'Z'
};

var socket = io.connect();

socket.on('connect', function() {
	console.log('connecting to socket.io');
});

socket.on('newtweets', function (new_tweets) {
	showNewTweets(new_tweets);
});
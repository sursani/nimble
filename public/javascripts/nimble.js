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
	return '<li class="tweet-stream"><div class="profile-image"><img src="' + data.profile_image_url + '"/></div><div class="tweet-info"><div class="user">' + data.full_name + ' (@' + data.user_name + ')' + '</div><div class="text">' + data.text + '</div><div class="date"><abbr class="timeago" title="' + ISODateString(new Date(data.created_on)) + '"></abbr></div></div></li>';
};

var ISODateString = function (d) {
    function pad (n) {
        return n < 10 ? '0' + n : n
    }
    return d.getUTCFullYear()+'-'
    	+ pad(d.getUTCMonth()+1)+'-'
    	+ pad(d.getUTCDate())+'T'
    	+ pad(d.getUTCHours())+':'
    	+ pad(d.getUTCMinutes())+':'
    	+ pad(d.getUTCSeconds())+'Z';
};

var replaceURLWithHTMLLinks = function (text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, '<a href="$1" target="_blank">$1</a>');
};

$('#showMore').click(function(e) {
	e.preventDefault();
	$.post('/getmoretweets', { page: nimbleGlobal.nextPage }, function (data) {
		if (data && data.length > 0) {
			nimbleGlobal.nextPage = nimbleGlobal.nextPage + 1;
			showOldTweets(data);
		}
	});
});

// DOM ready
$(function () {
	$('.date').each(function(i) {
		var the_date = new Date($(this).text());
		$(this).html('<abbr class="timeago" title="' + ISODateString(the_date) + '"></abbr>');
	});
	
	$('abbr.timeago').livequery(function () {
		$(this).timeago();
	});
	
	$('.text').livequery(function () {
		var text = replaceURLWithHTMLLinks($(this).text());
		$(this).html(text);
	});
});

// Socket IO
var socket = io.connect();

socket.on('connect', function() {
	console.log('connecting to socket.io');
});

socket.on('newtweets', function (new_tweets) {
	showNewTweets(new_tweets);
});
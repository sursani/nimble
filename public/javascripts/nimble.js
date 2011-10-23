var showNewTweets = function (tweets) {
	for (var i=0; i<tweets.length; i++) {
		var new_tweet = formatTweetList(tweets[i]);
		$(new_tweet).hide().prependTo('div.twitterstream ul').fadeIn('slow');
	}
};

var showOldTweets = function (tweets) {
	for (var i=0; i<tweets.length; i++) {
		var new_tweet = formatTweetList(tweets[i]);
		$(new_tweet).hide().appendTo('div.twitterstream ul').fadeIn('slow');
	}
};

var formatTweetList = function (data) {
	return '<li class="tweet-stream"><div class="profile-image"><img src="' + data.profile_image_url + '"/></div><div class="tweet-info"><div class="user">' + data.full_name + ' <span class="username">' + data.user_name + '</span>' + '</div><div class="text">' + data.text + '</div><div class="date"><abbr class="timeago" title="' + ISODateString(new Date(data.created_on)) + '"></abbr></div></div></li>';
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
	
	var more_tweets_url = '/' + nimbleGlobal.category + '/getmoretweets';
	var params = {};
	params.page = nimbleGlobal.next_page;
	
	if (nimbleGlobal.user_name) {
		params.user_name = nimbleGlobal.user_name;
		more_tweets_url = '/' + nimbleGlobal.category + '/user/getmoretweetsbyuser';
	}
	
	$.post(more_tweets_url, params, function (data) {
		if (data && data.length > 0) {
			nimbleGlobal.next_page = nimbleGlobal.next_page + 1;
			showOldTweets(data);
		}
	});
});

// DOM ready
$(function () {
	$('div.date').each(function(i) {
		var the_date = new Date($(this).text());
		$(this).html('<abbr class="timeago" title="' + ISODateString(the_date) + '"></abbr>');
	});
	
	$('abbr.timeago').livequery(function () {
		$(this).timeago();
	});
	
	$('div.text').livequery(function () {
		var text = replaceURLWithHTMLLinks($(this).text());
		$(this).html(text);
	});
	
	$('span.username').livequery(function () {
		var user_name = $(this).text();
		$(this).html('<a href="/' + nimbleGlobal.category + '/user/' + user_name + '">@' + user_name + '</a>');
	});
});

// Socket IO
var socket = io.connect();

socket.on('connect', function() {
	//console.log('connecting to socket.io');
});

socket.on('newtweets', function (new_tweets) {
	var tweets = [];
	
	if (nimbleGlobal.category && nimbleGlobal.user_name) {
		for (var i=0; i<new_tweets.length; i++) {
			if (new_tweets[i].user_name === nimbleGlobal.user_name &&
				new_tweets[i].category === nimbleGlobal.category) {
				tweets.push(new_tweets[i]);
			}
		}
	} else if (nimbleGlobal.category) {
		for (var i=0; i<new_tweets.length; i++) {
			if (new_tweets[i].category === nimbleGlobal.category) {
				tweets.push(new_tweets[i]);
			}
		}
	}
	
	if (tweets.length > 0) {
		showNewTweets(tweets);
	}
});
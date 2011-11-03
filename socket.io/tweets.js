var sys = require('sys');
var events = require('events');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var celebrityTweetProvider = new TweetProvider('celebrity');
var nbaTweetProvider = new TweetProvider('nba');

function Downloader() {
    if(false === (this instanceof Downloader)) {
        return new Downloader();
    }

    events.EventEmitter.call(this);
}
sys.inherits(Downloader, events.EventEmitter);

var celebLastDate = new Date();
celebrityTweetProvider.findLastTweet(function(err, docs) {
	if (!err && docs.length > 0) {
		celebLastDate = new Date(docs[0].created_on);
	}
});

var nbaLastDate = new Date();
nbaTweetProvider.findLastTweet(function(err, docs) {
	if (!err && docs.length > 0) {
		nbaLastDate = new Date(docs[0].created_on);
	}
});

Downloader.prototype.download = function() {
    var self = this;

	setInterval(function() {
		celebrityTweetProvider.findByLastDate(celebLastDate, function (err, tweets) {
			console.log('celebrity tweets = ' + sys.inspect(tweets));
			if (tweets.length > 0) {
				var lastIndex = tweets.length - 1;
				celebLastDate = new Date(tweets[lastIndex].created_on);
				
				var new_tweets = [];
				for (var i=0; i<tweets.length; i++) {
					var tweet = {
						profile_image_url: tweets[i].profile_image_url,
						full_name: tweets[i].full_name,
						user_name: tweets[i].user_name,
						text: tweets[i].text,
						created_on: tweets[i].created_on,
						category: 'celebrity'
					};
					new_tweets.push(tweet);
				}
				console.log('celebrity new_tweets = ' + sys.inspect(new_tweets));
				self.emit('finished_celebrity', new_tweets);
			}
		});
		
		nbaTweetProvider.findByLastDate(nbaLastDate, function (err, tweets) {
			console.log('nba tweets = ' + sys.inspect(tweets));
			if (tweets.length > 0) {
				var lastIndex = tweets.length - 1;
				nbaLastDate = new Date(tweets[lastIndex].created_on);
				
				var new_tweets = [];
				for (var i=0; i<tweets.length; i++) {
					var tweet = {
						profile_image_url: tweets[i].profile_image_url,
						full_name: tweets[i].full_name,
						user_name: tweets[i].user_name,
						text: tweets[i].text,
						created_on: tweets[i].created_on,
						category: 'nba'
					};
					new_tweets.push(tweet);
				}
				console.log('nba new_tweets = ' + sys.inspect(new_tweets));
				self.emit('finished_nba', new_tweets);
			}
		});
    }, 10000);
}

exports.Downloader = Downloader;

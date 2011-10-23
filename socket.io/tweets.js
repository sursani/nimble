var sys = require('sys');
var events = require('events');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var CelebrityTweetProvider = new TweetProvider('celebrity');

function Downloader() {
    if(false === (this instanceof Downloader)) {
        return new Downloader();
    }

    events.EventEmitter.call(this);
}
sys.inherits(Downloader, events.EventEmitter);

var lastDate = new Date();
CelebrityTweetProvider.findLastTweet(function(err, docs) {
	if (!err && docs.length > 0) {
		lastDate = new Date(docs[0].created_on);
	}
});

Downloader.prototype.download = function() {
    var self = this;

    setInterval(function() {
		CelebrityTweetProvider.findByLastDate(lastDate, function(err, tweets) {
			if (tweets.length > 0) {
				var lastIndex = tweets.length - 1;
				lastDate = new Date(tweets[lastIndex].created_on);
				
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
				
				self.emit('finished', new_tweets);
			}
		});
    }, 10000);
}

exports.Downloader = Downloader;

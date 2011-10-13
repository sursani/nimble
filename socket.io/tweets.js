var sys = require('sys');
var events = require('events');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var TweetProvider = new TweetProvider();

function Downloader() {
    if(false === (this instanceof Downloader)) {
        return new Downloader();
    }

    events.EventEmitter.call(this);
}
sys.inherits(Downloader, events.EventEmitter);

var lastDate = new Date();
TweetProvider.findLastTweet(function(err, docs) {
	if (!err && docs.length > 0) {
		lastDate = new Date(docs[0].created_on);
	}
});

Downloader.prototype.download = function() {
    var self = this;

    setInterval(function() {
		TweetProvider.findByLastDate(lastDate, function(err, tweets) {
			if (tweets.length > 0) {
				var lastIndex = tweets.length - 1;
				lastDate = new Date(tweets[lastIndex].created_on);
				self.emit('finished', tweets);
			}
		});
    }, 10000);
}

exports.Downloader = Downloader;

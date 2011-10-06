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

var lastDate = new Date(79,5,24);

Downloader.prototype.download = function(last_tweet) {
    var self = this;

    setInterval(function() {
		TweetProvider.findByLastDate(lastDate, function(err, tweets) {
			if (tweets.length > 0) {
				lastDate = new Date(tweets[0].created_on);
				self.emit('finished', sys.inspect(tweets));
			}
		});
        
    }, 5000);
}

exports.Downloader = Downloader;

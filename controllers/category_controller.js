var sys = require('sys');
var nimble = require('nimble');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var FriendProvider = require('../providers/friend_provider').FriendProvider;
var tweetProvider = new TweetProvider();
var friendProvider = new FriendProvider();

module.exports = {

	index: function (req, res, next) {
		var category = req.params.category.toLowerCase();
		if (nimble.isValidCategory(category)) {
			tweetProvider.getPagedTweets(null, category, function (err, tweets, cat) {
				if (!err) {
					friendProvider.find(category, function (err, friends) {
						console.log('err here: ' + err);
						console.log('friends here: ' + sys.inspect(friends));
						if (!err) {
							var viewModel = {
								tweets: tweets,
								friends: friends,
								category: cat
							};
							
							var title = '';
							if (cat === 'celebrity') {
								title = 'Celebrity';
							} else if (cat === 'nba') {
								title = 'NBA';
							}
						
							res.render('category/index', {
								title: title + ' Tweets',
								model: viewModel
							});
						} else {
							next();
						}
					});
				} else {
					next();
				}
			});
		} else {
			next();
		}
	},
	
	getMoreTweets: function (req, res, next) {
		var category = req.params.category.toLowerCase();
		if (nimble.isValidCategory(category)) {
			tweetProvider.getPagedTweets(req.body.last_date, category, function(err, docs) {
				if (!err) {
					res.json(docs);
				} else {
					next();
				}
			});
		} else {
			next();
		}
	}
};

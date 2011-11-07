var sys = require('sys');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var FriendProvider = require('../providers/friend_provider').FriendProvider;
var tweetProvider = new TweetProvider();
var friendProvider = new FriendProvider();

module.exports = {

	index: function (req, res, next) {
		if (req.category) {
			tweetProvider.getPagedTweets(null, req.category, function (err, tweets, cat) {
				if (!err) {
					friendProvider.find(req.category, function (err, friends) {
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
		if (req.category) {
			tweetProvider.getPagedTweets(req.body.last_date, req.category, function (err, tweets) {
				if (!err) {
					res.json(tweets);
				} else {
					next();
				}
			});
		} else {
			next();
		}
	}
};

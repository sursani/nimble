var sys = require('sys');
var twitter = require('twitter');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var TweetProvider = new TweetProvider();
var FriendProvider = require('../providers/friend_provider').FriendProvider;
var friendProvider = new FriendProvider();

module.exports = {

	index: function (req, res) {
		TweetProvider.getPagedTweets(1, function(err, docs) {
			if (!err) {
				friendProvider.find(function(err, friends){
					if (!err) {
						var viewModel = {
							tweets: docs,
							friends: friends
						};
						
						res.render('index/index', {
							title: 'Nimble Celebrity Tweets',
							model: viewModel
						});
					} else {
						res.end();
					}
				});
			} else {
				res.end();
			}
		});
	},

	about: function (req, res) {
		res.render('index/about', { 
			title: 'About'
		});
	},
	
	getMoreTweets: function (req, res) {
		TweetProvider.getPagedTweets(req.body.page, function(err, docs) {
			if (!err) {
				res.json(docs);
			} else {
				res.end();
			}
		});
	}
};

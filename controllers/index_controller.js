var sys = require('sys');
var nimble = require('nimble');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;

module.exports = {
	
	index: function (req, res) {
		var categories = nimble.getAllCategories();
		var tweetsByCategory = [];
		
		for (var i=0; i<categories.length; i++) {
			var tweetProvider = new TweetProvider(categories[i]);
			tweetProvider.getPagedTweets(1, function (err, docs) {
				var m = {
					tweets: docs
				};
				tweetsByCategory.push(m);
				finalCallback();
			});
		}
		
		var finalCallback = function () {
			if (categories.length === tweetsByCategory.length) {
				var viewModel = {
					tweetsByCategory: tweetsByCategory,
					categories: categories
				};
				
				res.render('index/index', {
					title: 'Index',
					model: viewModel
				});
			}
		};
	},
	
	about: function (req, res) {
		res.render('index/about', { 
			title: 'About'
		});
	}
	
};
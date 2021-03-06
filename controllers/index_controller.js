var sys = require('sys');
var nimble = require('nimble');

var TweetProvider = require('../providers/tweet_provider').TweetProvider;
var tweetProvider = new TweetProvider();

module.exports = {
	
	index: function (req, res) {
		var categories = nimble.getAllCategories();
		var tweetsByCategory = [];
		
		for (var i=0; i<categories.length; i++) {
			tweetProvider.getPagedTweets(null, categories[i], function (err, tweets, category) {
				var model = {
					tweets: tweets,
					category: category
				};
				
				tweetsByCategory.push(model);
				finalCallback();
			});
		}
		
		var finalCallback = function () {
			if (categories.length === tweetsByCategory.length) {
				var viewModel = {
					tweetsByCategory: tweetsByCategory
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
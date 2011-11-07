// constant
var per_page = 10;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nimble');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var TweetSchema = new Schema({
    user_name     			: String
  , user_name_lower			: String
  , text    				: String
  , profile_image_url 		: String
  , full_name				: String
  , created_on				: Date
  , tweet_id				: { type: Number, index: { unique: true }  }
  , category				: String
});

TweetSchema.index({ category: 1, created_on: -1, user_name_lower: 1 });

mongoose.model('Tweet', TweetSchema);
Tweet = mongoose.model('Tweet');

TweetProvider = function() {};

// Find Tweet by Id
TweetProvider.prototype.findById = function (id, callback) {
	Tweet.findById(id, function (err, tweet) {
		if (!err) {
			callback(null, site);
		}
	});
};

// Find Tweet by Date
TweetProvider.prototype.findByLastDate = function (lastDate, callback) {
	Tweet
		.where('created_on').gt(lastDate)
		.run(callback);
};

// Find last Tweet
TweetProvider.prototype.findLastTweet = function (callback) {
	Tweet
		.find()
		.sort('created_on', 'descending')
		.limit(1)
		.run(callback);
};

// Get Paged Tweets
TweetProvider.prototype.getPagedTweets = function (lastDate, category, callback) {
	if (lastDate) {
		var date = new Date(lastDate);
		Tweet
			.where('created_on').lt(lastDate)
			.where('category', category)
			.sort('created_on', 'descending')
			.limit(per_page)
			.run(function (err, docs) {
				callback(err, docs, category);
			});
	} else {
		Tweet
			.where('category', category)
			.sort('created_on', 'descending')
			.limit(per_page)
			.run(function (err, docs) {
				callback(err, docs, category);
			});
	}
};

// Get Paged Tweets by User
TweetProvider.prototype.getPagedTweetsByUser = function (lastDate, category, user_name, callback) {
	if (lastDate) {
		var date = new Date(lastDate);
		Tweet
			.where('category', category)
			.where('user_name_lower', user_name.toLowerCase())
			.where('created_on').lt(date)
			.sort('created_on', 'descending')
			.limit(per_page)
			.run(callback);
	} else {
		Tweet
			.where('category', category)
			.where('user_name_lower', user_name.toLowerCase())
			.sort('created_on', 'descending')
			.limit(per_page)
			.run(callback);
	}
};

// Create a new Tweet
TweetProvider.prototype.save = function (category, params, callback) {
	Tweet.find({ tweet_id: params['tweet_id'] }, function (err, tweets) {
		if (tweets.length < 1) {
			var tweet = new Tweet({
					user_name: params['user_name'],
					user_name_lower: params['user_name'].toLowerCase(),
					text: params['text'],
					profile_image_url: params['profile_image_url'],
					full_name: params['full_name'],
					created_on: params['created_on'],
					tweet_id: params['tweet_id'],
					category: category
			});
  			tweet.save(function (err) {
				callback();
  			});
		}
	});
};

exports.TweetProvider = TweetProvider;
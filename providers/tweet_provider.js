// constant
var per_page = 10;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nimble');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var TweetSchema = new Schema({
    user_name     			: String
  , user_name_lower			: { type: String, index: true }
  , text    				: String
  , profile_image_url 		: String
  , full_name				: String
  , created_on				: { type: Date, index: true }
  , tweet_id				: { type: Number, index: { unique: true }  }
});

var Tweet = null;

TweetProvider = function (category) {
	mongoose.model(category + '.Tweet', TweetSchema);
	Tweet = mongoose.model(category + '.Tweet');
};

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
	Tweet.where('created_on').gt(lastDate).run(callback);
};

// Find last Tweet
TweetProvider.prototype.findLastTweet = function (callback) {
	Tweet.find().sort('created_on', 'descending').limit(1).run(callback);
};

// Get Paged Tweets
TweetProvider.prototype.getPagedTweets = function(lastDate, category, callback) {
	if (lastDate) {
		var date = new Date(lastDate);
		Tweet.find().where('created_on').lt(lastDate).sort('created_on', 'descending').limit(per_page).run(function (err, docs) {
			callback(err, docs, category);
		});
	} else {
		Tweet.find().sort('created_on', 'descending').limit(per_page).run(function (err, docs) {
			callback(err, docs, category);
		});
	}
};

// Get Paged Tweets by User
TweetProvider.prototype.getPagedTweetsByUser = function(lastDate, user_name, callback) {
	if (lastDate) {
		var date = new Date(lastDate);
		Tweet
			.find()
			.where('user_name_lower', user_name.toLowerCase())
			.where('created_on').lt(date)
			.sort('created_on', 'descending')
			.limit(per_page)
			.run(callback);
	} else {
		Tweet
			.find()
			.where('user_name_lower', user_name.toLowerCase())
			.sort('created_on', 'descending')
			.limit(per_page)
			.run(callback);
	}
};

// Create a new Tweet
TweetProvider.prototype.save = function (params, callback) {
	Tweet.find({ tweet_id: params['tweet_id'] }, function (err, docs) {
		if (docs.length < 1) {
			var tweet = new Tweet({
					user_name: params['user_name'],
					user_name_lower: params['user_name'].toLowerCase(),
					text: params['text'],
					profile_image_url: params['profile_image_url'],
					full_name: params['full_name'],
					created_on: params['created_on'],
					tweet_id: params['tweet_id']
			});
  			tweet.save(function (err) {
				callback();
  			});
		}
	});
};

exports.TweetProvider = TweetProvider;
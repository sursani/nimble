// constant
var per_page = 10;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nimble');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Tweet = new Schema({
    user_name     			: String
  , user_name_lower			: { type: String, index: true }
  , text    				: String
  , profile_image_url 		: String
  , full_name				: String
  , created_on				: { type: Date, index: true }
  , tweet_id				: { type: Number, index: { unique: true }  }
});

mongoose.model('Tweet', Tweet);
var Tweet = mongoose.model('Tweet');

TweetProvider = function(){};

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
TweetProvider.prototype.getPagedTweets = function(page, callback) {
	Tweet.find().sort('created_on', 'descending').skip((page - 1) * per_page).limit(per_page).run(callback);
};

// Get Paged Tweets by User
TweetProvider.prototype.getPagedTweetsByUser = function(page, user_name, callback) {
	Tweet.find().where('user_name_lower', user_name.toLowerCase()).sort('created_on', 'descending').skip((page - 1) * per_page).limit(per_page).run(callback);
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
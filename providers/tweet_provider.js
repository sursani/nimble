var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nimble');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Tweet = new Schema({
    user_name     			: String
  , text    				: String
  , profile_image_url 		: String
  , full_name				: String
  , created_on				: Date
  , tweet_id				: Number
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

var per_page = 3;

// Get Latest Tweets
TweetProvider.prototype.getPagedTweets = function(page, callback) {
	Tweet.find().sort('created_on', 'descending').skip((page - 1) * per_page).limit(per_page).run(callback);
};

// Create a new Tweet
TweetProvider.prototype.save = function (params, callback) {
	//Tweet.find({ tweet_id: params['tweet_id'] }, function (err, docs) {
		//if (!err && docs == []) {
			var tweet = new Tweet({
					user_name: params['user_name'],
					text: params['text'],
					profile_image_url: params['profile_image_url'],
					full_name: params['full_name'],
					created_on: params['created_on'],
					tweet_id: params['tweet_id']
			});
  			tweet.save(function (err) {
				callback();
  			});
		//}
	//});
};

exports.TweetProvider = TweetProvider;
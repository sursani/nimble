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
	//Tweet.findOne({ name: name }, function (err, tweet) {
	//	if (!err) {
	//		callback(null, tweet);
	//	}
	//});
	console.log('lastDate inside findByLastDate ' + lastDate);
	Tweet.where('created_on').gt(lastDate).run(callback);
};

// Create a new Tweet
TweetProvider.prototype.save = function (params, callback) {
  var tweet = new Site({
						user_name: params['user_name'],
						text: params['text'],
						profile_image_url: params['profile_image_url'],
						full_name: params['full_name'],
						created_on: new Date()
					});
  tweet.save(function (err) {
	callback();
  });
};

exports.TweetProvider = TweetProvider;
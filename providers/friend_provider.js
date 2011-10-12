var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nimble');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Friend = new Schema({
    user_name     			: String
  , id    					: Number
  , full_name				: String
  , description				: String
  , friend_id				: Number
});

mongoose.model('Friend', Friend);
var Friend = mongoose.model('Friend');

FriendProvider = function(){};

// Find Tweet by Id
FriendProvider.prototype.find = function (callback) {
  Friend.find().sort('full_name', 'ascending').run(callback);
};

// Create a new Tweet
FriendProvider.prototype.save = function (params, callback) {
  var friend = new Friend({
						user_name: params['user_name'],
						friend_id: params['friend_ID'],
						full_name: params['full_name'],
						description: params['description']
					});
  friend.save(function (err) {
	callback();
  });
};

exports.FriendProvider = FriendProvider;
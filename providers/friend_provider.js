var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nimble');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var FriendSchema = new Schema({
    user_name     			: String
  , friend_id    			: { type: Number, index: { unique: true }  }
  , full_name				: String
  , full_name_lower			: { type: String, index: true }
  , description				: String
});

var Friend = null;

FriendProvider = function (category) {
	mongoose.model(category + '.Friend', FriendSchema);
	Friend = mongoose.model(category + '.Friend');
};

// Find all Friends
FriendProvider.prototype.find = function (callback) {
  Friend.find().sort('full_name_lower', 'ascending').run(callback);
};

// Create a new Friend
FriendProvider.prototype.save = function (params, callback) {
	Friend.find({ friend_id: params['friend_ID'] }, function (err, docs) {
		if (docs.length < 1) {
			var friend = new Friend({
				user_name: params['user_name'],
				friend_id: params['friend_id'],
				full_name: params['full_name'],
				full_name_lower: params['full_name'].toLowerCase(),
				description: params['description']
			});
			console.log('saving user ' + friend.friend_id);
			friend.save(function (err) {
				callback();
			});
		}
	});
};

exports.FriendProvider = FriendProvider;
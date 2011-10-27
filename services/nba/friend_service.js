var sys = require('sys');
var twitter = require('twitter');
var FriendProvider = require('../../providers/friend_provider').FriendProvider;
var friendProvider = new FriendProvider('nba');
var access_token = "399110344-H3TlQlfTKQwBZo7yfilrrTUIRZ0turcg3BQJTsjg";
var access_token_secret= "KFi3M2DVQxfYVU0Mk7HXKNtdjm6v6QClpwtftW6rY";
var screen_name = "NBATweetin";


//the code below just adds friends to the database
//before adding we need to verify if a friend exist then update

var ids = [];
var batchIds = [];

console.log(screen_name);
twitter.getFriendsIds(access_token, access_token_secret, screen_name, function(err, data){
	if (!err){
		for (var i=1; i<=data.length; i++){
			if ((i % 100) == 0){
				batchIds.push(ids.join(','));
				ids = [];
			} else {
				ids.push(data[i-1]);
			}	
		}
		
		if (ids.length > 0) {
			batchIds.push(ids.join(','));
		}	
		
		for (var i=0; i <= batchIds.length-1; i++) {
			console.log('batch: ' + batchIds[i]);
			twitter.getUsers(access_token, access_token_secret, batchIds[i], function(err, users){
				if (!err){
					for (var j=0;j<=users.length-1;j++){
						console.log('id ' + users[j].id);
						var friend = {
							
							friend_id: users[j].id,
							user_name: users[j].screen_name,
							full_name: users[j].name,
							description: users[j].description
						};
						
						friendProvider.save(friend, function(){
							console.log('saving ' + friend.full_name + ' to database');
						});
						
						console.log(users[j].name);
					};
				}
			});
		};
	}
});



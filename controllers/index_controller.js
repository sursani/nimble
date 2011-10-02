var twitter = require('twitter');

module.exports = {

	index: function (req, res) {
		res.render('index/index', {
			title: 'Sup now!'
		});
	},

	about: function (req, res) {
		res.render('index/about', { 
			title: 'About'
		});
	},
	
	initial: function (req, res) {
		twitter.getRequestToken(function (requestToken, requestTokenSecret) {
			var user = {};
			user.oauthRequestToken = requestToken;
			user.oauthRequestTokenSecret = requestTokenSecret;
			req.session.user = user;
			res.redirect('https://twitter.com/oauth/authorize?oauth_token=' + user.oauthRequestToken);
		});
	},
	
	success: function (req, res) {
		var user = req.session.user;
		
		twitter.getAuthAccessToken(user, req.query.oauth_verifier, function (accessToken, accessTokenSecret) {
			user.oauthAccessToken = accessToken;
			user.oauthAccessTokenSecret = accessTokenSecret;
			req.session.user = user;
			
			//user.sessionId = 1;//req.session.Id;
			//registration.saveUserAccessToken(user, callbackStream);
			//res.render('userstream', {
		    //	title: 'User stream'
		  	//});
			res.redirect('/home');
		});
	},
	
	home: function (req, res) {
		var user = req.session.user;
		
		twitter.getHomeTimeline(user, function(tweets) {
			console.log(tweets);
			res.end();
		});
	}

};

var twitter = require('twitter');
var SiteProvider = require('../providers/site_provider').SiteProvider;
var SiteProvider = new SiteProvider();

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
		
		twitter.getAuthAccessToken(user, req.query.oauth_verifier, function (access_token, access_token_secret) {
			user.oauthAccessToken = access_token;
			user.oauthAccessTokenSecret = access_token_secret;
			req.session.user = user;
			
			SiteProvider.findByName('nba', function(err, site) {
				// if site does not exist, add and save it
				if (!site) {
					SiteProvider.save({
						name: 'nba',
						description: 'site for nba players',
						access_token: access_token,
						access_token_secret: access_token_secret
					}, function (err) {
						if (!err) {
							console.log('saving the site.');
						}
					});
				}
				
				res.redirect('/home');
			});
		});
	},
	
	home: function (req, res) {
		SiteProvider.findByName('nba', function(err, site) {
			twitter.getHomeTimeline(site, function(tweets) {
				console.log(tweets);
				res.end();
			});
		});
	}

};

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nimble');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Site = new Schema({
    name     				: String
  , description    			: String
  , created_at 				: Date
  , access_token			: String
  , access_token_secret		: String
});

mongoose.model('Site', Site);
var Site = mongoose.model('Site');

SiteProvider = function(){};

// Find Site by Id
SiteProvider.prototype.findById = function (id, callback) {
  Site.findById(id, function (err, site) {
    if (!err) {
		callback(null, site);
	}
  });
};

// Find Site by Name
SiteProvider.prototype.findByName = function (name, callback) {
	Site.findOne({ name: name }, function (err, site) {
		if (!err) {
			callback(null, site);
		}
	});
};

// Create a new Site
SiteProvider.prototype.save = function (params, callback) {
  var site = new Site({
						name: params['name'],
						description: params['description'],
						created_at: new Date(),
						access_token: params['access_token'],
						access_token_secret: params['access_token_secret']
					});
  site.save(function (err) {
	callback();
  });
};

exports.SiteProvider = SiteProvider;
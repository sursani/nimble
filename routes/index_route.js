var indexController = require('../controllers/index_controller');

module.exports = function(app) {	
	app.get('/', indexController.index);
	app.get('/about', indexController.about);
	app.post('/getmoretweets', indexController.getMoreTweets);
};
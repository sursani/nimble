var categoryController = require('../controllers/category_controller');

module.exports = function(app) {	
	app.get('/:category', categoryController.index);
	app.post('/:category/getmoretweets', categoryController.getMoreTweets);
};
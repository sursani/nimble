var utility = require('../utility/helper');
var categoryController = require('../controllers/category_controller');

module.exports = function(app) {
	app.get('/:category', utility.validateCategory, categoryController.index);
	app.post('/:category/getmoretweets', utility.validateCategory, categoryController.getMoreTweets);
};
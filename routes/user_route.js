var utility = require('../utility/helper');
var userController = require('../controllers/user_controller');

module.exports = function(app) {	
	app.get('/:category/user/:user_name', utility.validateCategory, userController.displayUserTweets);
	app.post('/:category/user/getmoretweetsbyuser', utility.validateCategory, userController.getMoreTweetsByUser);
};
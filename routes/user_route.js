var userController = require('../controllers/user_controller');

module.exports = function(app) {	
	app.get('/:category/user/:user_name', userController.displayUserTweets);
	app.post('/:category/user/getmoretweetsbyuser', userController.getMoreTweetsByUser);
};
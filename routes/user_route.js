var userController = require('../controllers/user_controller');

module.exports = function(app) {	
	app.get('/user/:user_name', userController.displayUserTweets);
	app.post('/user/getmoretweetsbyuser', userController.getMoreTweetsByUser);
};
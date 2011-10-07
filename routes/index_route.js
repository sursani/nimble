var indexController = require('../controllers/index_controller');

module.exports = function(app) {	
	app.get('/', indexController.index);
	app.get('/about', indexController.about);
	app.post('/getmoretweets', indexController.getmoretweets);
	//app.get('/initial', indexController.initial);
	//app.get('/success', indexController.success);
};
var indexController = require('../controllers/index_controller');

module.exports = function(app) {	
	app.get('/', indexController.index);
	app.get('/about', indexController.about);
	app.get('/initial', indexController.initial);
	app.get('/success', indexController.success);
};
var nimble = require('nimble');

module.exports = {
	validateCategory: function (req, res, next) {
		var category = req.params.category.toLowerCase();
		if (nimble.isValidCategory(category)) {
			req.category = category;
		}
		
		next();
	}
};
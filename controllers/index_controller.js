module.exports = {
	
	index: function (req, res) {
		res.render('index/index', {
			title: 'Index'
		});
	},
	
	about: function (req, res) {
		res.render('index/about', { 
			title: 'About'
		});
	}
	
};
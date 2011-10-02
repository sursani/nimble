module.exports = {

	index: function(req, res) {
		res.render('index/index', {
			title: 'Sup now!'
		});
	},

	about: function(req, res) {
		res.render('index/about', { 
			title: 'About'
		});
	}

};
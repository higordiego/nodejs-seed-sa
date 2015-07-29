module.exports = {
	loginSistema: function(req, res, next) {
		if(!req.isAuthenticated()) {
			return res.redirect('/login');
		}
		return next();
	},
	loginApi: function(req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		} else {
			res.send(403);
		}
		
	}
};
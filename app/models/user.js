module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	
	var pass = require('../middleware/password');

	function configPass (v) {
		return pass.hash(v);
	}

	var user = new Schema(
		{
			email: 		{ type: String, unique: true, required: true  },
			token: 		{ type: String, required: true  },
			password: { type: String, required: true, set: configPass},
			admin: 		{type: Boolean, default: false },
			created_at: { type: Date, default: Date.now },
			updated_at: { type: Date, default: Date.now }
		}
	);
	return mongoose.model('User', user);
}

module.exports = function(app){
	var indexApi = {
		index: function(req,res){
			res.json({message: 'Bem vindo api social!'});
		},
		user: function(req,res){
			var _id = req.user._id;
			User.findById(_id,function(err, user){
				if(err) {
					console.log('Error: ', err);
					res.json(err);
				} else {
					res.json(user);
				}
			});
		}
	};
	return indexApi;
}
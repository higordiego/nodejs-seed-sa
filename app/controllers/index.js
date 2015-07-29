module.exports = function(app){

	// var ping = app.models.ping;

	var IndexController = {
		ping: function(req,res){

			res.status(200).send('pong');
			// Resposta.find(function(err, respostas){
			// 	if(err) {
			// 		console.log("Erro ao listar gavetas: " + err);
			// 	} else {
			// 		res.render('respostas/listar', 
			// 		{
			// 			respostas: respostas,
			// 			user: req.user,
			// 			menu: 'financeiro'
			// 		});
			// 	}
			// });
		}
	};
	return IndexController;
}
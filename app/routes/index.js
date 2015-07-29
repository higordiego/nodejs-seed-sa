module.exports = function(app){
	var index = app.controllers.index;
		//autenticar = require('./../middleware/autenticador');

	// app.get('/ping', autenticar.loginSistema, resposta.index);
	app.get('/ping', index.ping);
}
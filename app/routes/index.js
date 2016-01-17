module.exports = function(app){
	var   autenticar = require('../middleware/autenticador')
	, passport = require('passport')
	, api = app.controllers.api;

// Inde app
app.get('/',api.index);

// Login Erro..
app.get('/api/loginfail', function(req, res){
	res.status(403).json({login: false});
});
// Autenticação com o Basic
app.post('/api/login', passport.authenticate('local', { failureRedirect: '/api/loginfail'}), api.user);

// Autenticação com token pelo api
app.get('/api/listar', passport.authenticate('bearer', { session: false }),function(req, res) {
	res.json(req.user);
});
}
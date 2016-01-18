module.exports = function(app){
	var mongoose = require('mongoose');
//Conexão com Banco de Dados
mongoose.connect('mongodb://localhost/banc-seed', function(err){
  // mongoose.connect('', function(err){
  	if( err ) {
  		console.log("Error conectar mongo db: " + err);
  	} 
  });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('mongodb: Conexao realizada!');
});	
}


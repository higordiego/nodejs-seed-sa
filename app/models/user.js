module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var pass = require('../../middleware/password');

	function configPass (v) {
	  return pass.hash(v);
	}

	
	var user = new Schema({
		nome: 				{ type:String,	default: ""},
		cpf: 				{ type:String,	default: ""},
		cnpj: 				{ type:String,	default: ""},
		razao: 				{ type:String,	default: ""},
		nome_responsavel: 	{ type:String,	default: ""},
		data_nascimento: 	{ type:String,	default: ""},
		sexo: 				{ type:String,	default: ""},
		email: 				{ type: String, unique: true },
		password: 			{ type: String, set: configPass},
		endereco: {
		    cep: 			{ type:String, 	default: ""},
		    endereco: 		{ type:String, 	default: ""},
			numero: 		{ type:String, 	default: ""},
			bairro: 		{ type:String, 	default: ""},
			cidade: 		{ type:String, 	default: ""},
			estado: 		{ type:String, 	default: ""},
			complemento: 	{ type:String, 	default: ""}
		},
		telefone: {
		    ddd_fixo: 		{ type:String, 	default: ""},
		    telefone_fixo: 	{ type:String, 	default: ""},
		    ddd_celular: 	{ type:String, 	default: ""},
		    telefone_celular:{type:String, 	default: ""}
		},
		is_admin: 			{ type: Boolean, default: false },
		ativo: 				{ type: Boolean, default: false },
		profissao: 			{ type:String, 	default: ""},
		numero_conselho: 	{ type:String, 	default: ""},
		estado_conselho: 	{ type:String, 	default: ""},
		nome_divulgacao: 	{ type:String, 	default: ""},


		especialidade:		{ type:String, 	default: ""},
		servico_medicos:	{ type:String, 	default: ""},
		especialidade_medicos:		{ type:String, 	default: ""},
		especialidade_odontologia:	{ type:String, 	default: ""},
		outro: 						{ type:String, 	default: ""},
		created_at: 		{ type: Date, default: Date.now }
	});

	return mongoose.model('User', user);
}
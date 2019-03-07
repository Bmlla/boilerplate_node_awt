//cria e getta os usuarios
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Cria o model para consulta no banco de dados
module.exports = mongoose.model('User', new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean 
}));
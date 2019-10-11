const mongoose=require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  id: { type: Number, required: true, unique: true },
	user: { type: String, required: true, unique: true },
	email: { type: String, required: true },
	password: { type: String, required: true }
})

// usuarios es el nombre de la coleccion de la bd
let UsuarioModel = mongoose.model('usuarios', UserSchema)
module.exports = UsuarioModel

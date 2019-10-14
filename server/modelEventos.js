const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

let EventSchema=new Schema({
  title:{ type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: false },
  user: { type: Schema.ObjectId, ref: "usuarios" } //Se hace referencia a la tabla usuarios
})

// Inicializar el modulo de autoincremento para la tabla eventos
autoIncrement.initialize(mongoose.connection)
EventSchema.plugin(autoIncrement.plugin, {model: 'eventos', startAt: 1} );

// eventos es el nombre de la coleccion de la bd
let EventoModel = mongoose.model('eventos', EventSchema)
module.exports = EventoModel

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cuenta = Schema({
    usuario :  {type: Schema.ObjectId, ref: 'Usuario'},
    habitacione:[{type: Schema.ObjectId, ref: 'Habitaciones'}],
    subtotal: Number
    
});

module.exports = mongoose.model('Cuenta', Cuenta);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reservacion = Schema({
    Usuario:{type: Schema.ObjectId, ref: 'Usuario'},
    Habitacion: {type: Schema.ObjectId, ref: 'Habitaciones'},
    
    
});

module.exports = mongoose.model('Reservacion', Reservacion);
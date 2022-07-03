const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Habitaciones = Schema({
    NumeroHabitacion: Number,
    Servicios: [{type: Schema.ObjectId, ref: 'Servicios'}],
    estado: Boolean,
    numeroDias: Number,

});

module.exports = mongoose.model('Habitaciones', Habitaciones);
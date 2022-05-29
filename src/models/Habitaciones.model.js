const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Habitaciones = Schema({
    ServiciosHabitacion : Number,
    NumeroHabitacion: Number,
    Servicios: [{type: Schema.ObjectId, ref: 'Servicios'}],
    estado: Boolean,
});

module.exports = mongoose.model('Habitaciones', Habitaciones);
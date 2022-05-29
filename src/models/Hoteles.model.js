const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hoteles = Schema({
    NombreHotel: String,
    AdminHotel:{type: Schema.ObjectId, ref: 'Usuario'},
    eventos: [{type: Schema.ObjectId, ref: 'Eventos'}]
});

module.exports = mongoose.model('Hoteles', Hoteles);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Factura = Schema({
    
    costoReservacion:Number,
    subtotal: Number

    
    


});

module.exports = mongoose.model('Factura', Factura);
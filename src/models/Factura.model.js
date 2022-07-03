const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Factura = Schema({
    
    subtotal: Number,
    
    


});

module.exports = mongoose.model('Factura', Factura);
const express = require('express');
const habitacionescontroller = require('../controllers/Habitaciones.controller');
const mdAuth = require('../middlewares/autenticated.middlewares');

 var api = express.Router();

 api.put("/agregarHabitacion/:hotelId",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],
 habitacionescontroller.AgregarHabitaciones);//necesita el ID del Hotel(validaciones No necesarias)
 
 api.put("/editarhabitacion/:idHabitacion",[mdAuth.Auth, mdAuth.ensureAuthAdminHotel],
 habitacionescontroller.editarhabitacion);// necesita el ID de la habitacion(validaciones hechas Y necesarias)

 


 module.exports = api
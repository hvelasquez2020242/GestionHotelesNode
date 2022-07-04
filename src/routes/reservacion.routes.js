const express = require('express');
const ReservacionController = require('../controllers/reservacion.controller');
const mdAuth = require('../middlewares/autenticated.middlewares');

var api = express.Router();

api.put("/AgregarReservacion/:hotelId/:habitacionId",[mdAuth.Auth],ReservacionController.reservacion);

module.exports = api;

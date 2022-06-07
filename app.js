const express = require('express');
const cors = require('cors');
const app = express();

//importaciones
const Usuario = require('./src/routes/usuario.routes');
const Hoteles = require('./src/routes/Hoteles.routes');
//const Equipo = require('./src/routes/equipo.routes');
//const Partido = require('./src/routes/partido.routes');


app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(cors());

app.use('/api',Usuario,Hoteles);

module.exports = app;
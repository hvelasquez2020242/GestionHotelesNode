const HabitacionesModel = require('../models/Habitaciones.model');
const Hoteles = require('../models/Hoteles.model');
const Usuario = require('../models/Usuario.models');
const Habitaciones = require('../models/Habitaciones.model.js');


function AgregarHabitaciones(req,res){
    var params = req.body;
    var hotelId = req.params.hotelId;
    var habitacioModel = new Habitaciones();

    if(params.NumeroHabitacion){
        Habitaciones.findOne({NumeroHabitacion : params.NumeroHabitacion},(err,habitacionFineded)=>{
            if(err){
                return res.status(500).send({message:'error en la peticon 1'});
            }else if(!habitacionFineded){
                habitacioModel.NumeroHabitacion = params.NumeroHabitacion;
                habitacioModel.estado = true ;
                habitacioModel.save((err,habitacionSaved)=>{
                    if(err){
                        return res.status(500).send({message:'error en la peticion 2'});
                    }else if(habitacionSaved){
                            Hoteles.findByIdAndUpdate(hotelId,{$push:{habitaciones:habitacionSaved._id}},{new:true},(err,habiatcionUpdated)=>{
                                if(err){
                                    return res.status(500).send({message:'error en la peticion 3'});
                                }else if(habiatcionUpdated){
                                    return res.status(200).send({message:'habitacion guardada y agregada exitosamente',habitacionSaved});
                                }else{
                                    return res.status(500).send({message:'error al agregar la habitacion'});

                                }
                            })
                    }else{
                        return res.status(500).send({message:'error al guardar la habitacion '})
                    }
                })

            }else{
                return res.status(500).send({message:'error la habitacion ya existe'})
            }
        })

    }else{
        return res.status(500).send({message:'ingrese todos los campos obligatorios'})
    }
}

function editarhabitacion(req,res){
    var habitacionId = req.params.idHabitacion;
    var update = req.body

    Habitaciones.findOne({NumeroHabitacion: update.NumeroHabitacion},(err,habitacionencontrada)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la peticion 1'});

        }else if(!habitacionencontrada){
            Habitaciones.findByIdAndUpdate(habitacionId,update,{new:true},(err,habiatcionUpdated)=>{
                if(err){
                        return res.status(500).send({message:'error en la peticion 2'});
                }else if(habiatcionUpdated){
                    return res.status(200).send({message:'habitacion editada',habiatcionUpdated});
                }else{
                    return res.status(500).send({message:'error al editar la habitacion'})
                }
            })

        }else{
            return res.status(500).send({message:'error el numero del la habitacion ya existe'})
        }


    })

   
}

module.exports={
    AgregarHabitaciones,
    editarhabitacion,
}
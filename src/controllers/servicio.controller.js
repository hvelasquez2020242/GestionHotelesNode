const Habitacion = require('../models/Habitaciones.model');
const Servicio = require('../models/Servicios.model');

function AgregarServicio(req,res){
    var params = req.body;
    var ServicioModel = new Servicios();
    var HabtacionId= req.params.IdHabitacion;

    if(params.nombreServicio && params.costoServicio){

        ServicioModel.nombreServicio = params.nombreServicio;
        ServicioModel.costoServicio= params.costoServicio;
        ServicioModel.save((err,ServicioCreado)=>{
            if(err)return res.status(500).send({mensaje:'error en la peticion 1'});
            if(ServicioCreado){
                Habitacion.findByIdAndUpdate(HabtacionId,{$push:{Servicios:ServicioCreado._id}},{new:true},(err,ServicioAgregado)=>{
                    if(err)return res.status(500).send({mensaje:'error al agregar el servicio 2'});
                    if(ServicioAgregado){
                        
                    }

                })
            }else{
                return res.status(500).send({mensaje:'error al guardar el servicio'})
            }
        })


    }



}
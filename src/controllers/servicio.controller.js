const Habitacion = require('../models/Habitaciones.model');
const Servicio = require('../models/Servicios.model');

function AgregarServicio(req,res){
    var params = req.body;
    var ServicioModel = new Servicio();
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
                        return res.status(500).send({mensaje:'el servicio se a creado y agregado correctament'});

                    }else{
                        return res.status(500).send({mensaje:'erro al agregar el servicio'})
                    }

                })
            }else{
                return res.status(500).send({mensaje:'error al guardar el servicio'})
            }
        })


    }
    



}

function editarServicio(req,res){
    var servicioId = req.params.IdServicio;

    Servicios.findByIdAndUpdate(servicioId,(err,servicioUpdated)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la petiocion'});
        }else if(serviciofinded){
            return res.status(200).send({mensaje:'servicio Editado'},servicioUpdated);
        }else{
            return res.status(500).send({mensaje:'error al editar el servicio'});
        }

    })

}

function eliminatServicio(req,res){

}
module.exports ={
    AgregarServicio,
    editarServicio
}
const Usuario = require('../models/Usuario.models');
const Habitaciones = require('../models/Habitaciones.model');
const Cuenta = require('../models/cuenta.model');
const Hoteles = require('../models/Hoteles.model');
const Reservacion = require('../models/reservacion.model');

function reservacion (req,res){
    var idHotel = req.params.hotelId;
    var idHabitacion = req.params.habitacionId;
    var user = req.user.sub;
    var parametros = req.body;

    Habitaciones.findById(idHabitacion,(err,habitacionf)=>{
        if(err){

        }else if(habitacionf.estado !==true) {
            return res.status(500).send({message:'la habitacion ya esta reservada'})
        }else{
            if(parametros.numeroDias){

                if(!idHotel){
                    return res.status(500).send({message:'por favor envie el id del hotel'});
                }else if(!idHabitacion){
                    return res.status(500).send({message:'por favor envie el id de la habitacion '});
                }else{
                    var modelReservacion = new Reservacion();
        
                    modelReservacion.Usuario = user;
                    modelReservacion.habitacion = idHabitacion;
                    modelReservacion.Habitacion = idHabitacion;
                      
                    Habitaciones.findByIdAndUpdate( idHabitacion, parametros,{new:true},(err,habitacionUpdated)=>{
                        if(err){
                            return res.status(500).send({message:'error en la peticion 1'});
        
                        }else if(habitacionUpdated){
        
                            let precioHabitacion = habitacionUpdated.PrecioHabitacion;
                            let NumeroDias = habitacionUpdated.numeroDias;
                            let costohabitacion = precioHabitacion * NumeroDias;+
                            Cuenta.findOne({usuario:user},(err,cuentafinded)=>{
                                if(err){
                                    return res.status(500).send({message:'error en la petion 2'});
                                }else if(cuentafinded){
                                    let subtotalBefo = cuentafinded.subtotal;
                                
                                    let subtotalAfter = subtotalBefo + costohabitacion;
        
                                    Cuenta.findByIdAndUpdate(cuentafinded._id,{subtotal:subtotalAfter},{new:true},(err,cuentaUpdated)=>{
                                        if(err){
                                            return res.status(500).send({message:'error en la peticion 3'});
        
                                        }else if(cuentaUpdated){
        
                                            modelReservacion.save((err,reseracionSaved)=>{
                                                if(err){
                                                    return res.status(500).send({message:'error en la petiocn 4'});
                                                }else if(reseracionSaved){
                                                    Usuario.findByIdAndUpdate(user,{$push:{habitacion:idHabitacion}},{new:true},
                                                        (err,useradd)=>{
                                                            if(err){
                                                                return res.status(500).send({message:'error en la peticon 5'});
        
                                                            }else if(useradd){
                                                                
                                                                Cuenta.findByIdAndUpdate(cuentafinded,{$push:{habitaciones:idHabitacion}},
                                                                    (err,cuentaAc)=>{
                                                                        if(err){
                                                                            return res.status(500).send({message:'error en la petion 6'});
                                                                        }else if(cuentaAc){
                                                                            return res.status(500).send({message:'se actualizo y registro la reservacion en 3 tablas',reseracionSaved});
                                                                        }else{
                                                                            return res.status(500).send({message:'error al agregar la habitacion en la reservacion'});
                                                                        }
                                                                    })
        
                                                            }else{
                                                                return res.status(0500).send({message:'error al agregar la habitacion al usuario'});
                                                            }
                                                        })
        
        
                                                }else{
                                                    return res.status(500).send({message:'error al agregar la reservacion'})
                                                }
                                            })
        
                                        }else{
                                            return res.status(500).send({message:'error al actualizar la cuenta'});
                                        }
                                    })
        
        
                                }else{
                                    return res.status(500).send({message:'error al obtener la cuenta'})
                                }
                            })
        
                        }else{
                            return res.status(500).send({message:'error al actuzalisar la habitacion'})
                        }
                    })
        
        
                }
        
            }else{
                return res.status(500).send({message:'por favor llene todos por parametros obligatorios'})
            }

        }
    })

  

   

}

module.exports ={
    reservacion,
}
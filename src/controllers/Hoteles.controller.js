
const Usuario = require('../models/Usuario.models');
const Hoteles = require('../models/Hoteles.model');

function AgregarHoteles(req,res){
    var params = req.body;
    var HotelesModel = new Hoteles();
    var userId= req.user.sub;


        if(params.NombreHotel&&params.direccionHotel){

            HotelesModel.NombreHotel= params.NombreHotel;
            HotelesModel.direccionHotel= params.direccionHotel;
            HotelesModel.save((err,HotelSaved)=>{
                if(err){
                    return res.status(500).send({mensaje:'error en la peticion 1'});
                }else if(HotelSaved){
                    Usuario.findByIdAndUpdate(userId,{$push:{Hoteles:HotelSaved._id}},{new:true},
                        (err,hotelAgregado)=>{
                            if(err){
                                return res.status(500).send({message:'error en la peticion 2'})
                            }else if(hotelAgregado){
                                return res.status(500).send({mensaje:'el hotel se creo y se agreco exitosamente',HotelSaved});


                            }else{
                                return res.status(500).send({message:'errro al agregar El hotel a usuario'})

                            }
                        })

                }else{
                    return res.status(500).send({message: "No se guardo el hotel"})
                }
            })

        }else{ 
            return res.status(500).send({message:'llene los parametros obligatorios'})
        }
}


function EditarHoteles(req,res){
    var idHotel = req.params.idHotel;
    var update = req.body;
    
    Hoteles.findByIdAndUpdate(idHotel,update,{new:true},(err,hotelUpdated)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion 1'});

        }else if(hotelUpdated){
            return res.status(200).send({message:'hotel Actualizado',hotelUpdated});

        }else{
            return res.status(500).send({message:'error al editar el hotel'})
        }
    })


}
function ElimnarHotel(req,res){
    var hotelId = req.params.idHotel;
    var userId= req.user.sub;

    Usuario.findById(userId,(err,userFinded)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion 1'});

        }else if(userFinded){
            if(userFinded.Hoteles.includes(hotelId)){
                Usuario.findByIdAndUpdate(userId,{$pull:{Hoteles:hotelId}},{new:true},(err,hotelUpdated)=>{
                    if(err){
                        return res.status(500).send({message:'error en la peticion 2'});

                    }else if(hotelUpdated){
                        Hoteles.findByIdAndRemove(hotelId,(err,hotelRemoved)=>{
                            if(err){
                                return res.status(500).send({message:'error en la peticion 3'});

                            }else if(hotelRemoved){
                                return res.status(200).send({message:'el hotel se removio y actualizo correctamente',hotelRemoved})
                            }else{
                                return res.status(500).send({message:'error al remover el hotel'})
                            }
                        })

                    }else{
                        return res.status(500).send({message:'error al actualizar el usuario'})
                    }
                })
            }
        }else{
            return res.status(500).send({message:'error al encontrar el hotel'})
        }
    })
    
}

function ObtenerHoteles (req,res){
    var userId = req.user.sub;

    Usuario.findById(userId,(err,hotelesfinded)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion 1'});
        }else if(hotelesfinded){
            let hoteles = hotelesfinded.Hoteles;
            return res.status(200).send({message:'Hoteles', hoteles});
        }else{
            return res.status(500).send({message:'no hay hoteles'})
        }
    }).populate('Hoteles');



}

function ObtenerHotelesxId(req,res){
    var hotelId = req.params.idHotel;

    Hoteles.findById(hotelId,(err,hotelfinded)=>{
        if(err){
            return res.status(500).send({message:'error en la peticion1'});
        }else if(hotelesfinded){
            return res.status(200).send({message:'Hotel',hotelesfinded});
        }else{
            return res.status(500).send({message:'error al obtener los hoteles'})
        }
    })
}



module.exports={
    AgregarHoteles,
    EditarHoteles,
    ElimnarHotel,
    ObtenerHoteles,
    ObtenerHotelesxId
}
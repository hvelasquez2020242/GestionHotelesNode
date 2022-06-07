
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

const Usuario = require("../models/Usuario.models");

function adminDefult() {
    var UsuarioModel = new Usuario();

    Usuario.findOne({ username: "SuperAdmin" }, (err, SuperAdminFinded) => {
        if (err) {
            console.log(err);
        } else if (SuperAdminFinded) {
            console.log("Usuario SuperAdmin ya fue creado");
        } else {
            bcrypt.hash("123456", null, null, (err, passwordHashed) => {
                if (err) {
                    console.log("Error al encriptar contraseña de SuperAdmin");
                } else if (passwordHashed) {
                    UsuarioModel.password = passwordHashed;
                    UsuarioModel.nombre = "SuperAdmin";
                    UsuarioModel.username = "SuperAdmin";
                    UsuarioModel.rol = "ROL_Admin";
                    UsuarioModel.save((err, userSaved) => {
                        if (err) {
                            console.log("Error al crear usuario SuperAdmin");
                        } else if (userSaved) {
                            console.log("Usuario SuperAdmin creado exitosamente");
                        } else {
                            console.log("No se creó el usuario SuperAdmin");
                        }
                    });
                } else {
                    console.log("Contraseña de SuperAdmin no encriptada");
                }
            });
        }
    });
}

function login(req,res){
    var params = req.body;
    
    if(params.username && params.password){
        Usuario.findOne({username: params.username}, (err, userFind)=>{
            if(err){
                return res.status(500).send({message: 'Error general'});
            }else if(userFind){
                bcrypt.compare(params.password, userFind.password, (err, checkPassword)=>{
                    if(err){
                        return res.status(500).send({message: 'Error general en la verificación de la contraseña'});
                    }else if(checkPassword){
                        if(params.getToken == 'true'){
                            return res.send({ token: jwt.crearToken(userFind)});
                        }else{
                            userFind.password = undefined;
                            return res.status(200).send({ usuario: userFind })
                        }
                    }else{
                        return res.status(401).send({message: 'Contraseña incorrecta'});
                    }
                })
            }else{
                return res.send({message: 'Usuario inexistente'});
            }
        })
    }else{
        return res.status(401).send({message: 'Por favor ingresa los datos obligatorios'});
    }
}

function registrarAdmin(req,res){
    var UsuarioModel = new Usuario();
    var params = req.body;

    Usuario.findOne({ username: params.username},(err,userFinded)=>{
        if(err) return res.status(500).send({mensaje:'erro en la peticion 1'});
        if(userFinded){
            return res.status(500).send({mensaje:'el nombre de usuario ya se encuenta registrado'})
        }else{
            if(params.username && params.nombre && params.password){
                bcrypt.hash(params.password, null, null, (err, passwordHashed) => {
                    if (err) {
                        return res.status(500).send({message: "Error al encriptar contraseña"});
                    } else if (passwordHashed) {
                        UsuarioModel.password = passwordHashed;
                        UsuarioModel.nombre = params.name;
                        UsuarioModel.username = params.username;
                        UsuarioModel.rol ='ROL_Admin'
                        UsuarioModel.save((err, userSaved) => {
                            if (err) {
                                return res.status(500).send({message: "Error al agregar empresa"});
                            } else if (userSaved) {
                                return res.send({message: "Empresa agregada exitosamente",userSaved});
                            } else {
                                return res.status(500).send({message: "No se agregó la empresa"});
                            }
                        });
                    } else {
                        console.log("Contraseña de SuperAdmin no encriptada");
                    }
                });

            }
        }

    })


}


function registrarAdminHotel(req,res){//pendiente
    var UsuarioModel = new Usuario();
    var params = req.body;

    Usuario.findOne({ username: params.username},(err,userFinded)=>{
        if(err) return res.status(500).send({mensaje:'erro en la peticion 1'});
        if(userFinded){
            return res.status(500).send({mensaje:'el nombre de usuario ya se encuenta registrado'})
        }else{
            if(params.username && params.nombre && params.password){
                bcrypt.hash(params.password, null, null, (err, passwordHashed) => {
                    if (err) {
                        return res.status(500).send({message: "Error al encriptar contraseña"});
                    } else if (passwordHashed) {
                        UsuarioModel.password = passwordHashed;
                        UsuarioModel.nombre = params.name;
                        UsuarioModel.username = params.username;
                        UsuarioModel.rol ='ROL_AdminHotel'
                        UsuarioModel.save((err, userSaved) => {
                            if (err) {
                                return res.status(500).send({message: "Error al agregar empresa"});
                            } else if (userSaved) {
                               return res.status(200).send({message:'el adminHotel se creo correctamente',userSaved})
                            } else {
                                return res.status(500).send({message: "No se agregó la empresa"});
                            }
                        });
                    } else {
                        console.log("Contraseña de SuperAdmin no encriptada");
                    }
                });

            }
        }

    })


}

function registrarUsuario(req,res){
    var UsuarioModel = new Usuario();
    var params = req.body;

    Usuario.findOne({ username: params.username},(err,userFinded)=>{
        if(err) return res.status(500).send({mensaje:'erro en la peticion 1'});
        if(userFinded){
            return res.status(500).send({mensaje:'el nombre de usuario ya se encuenta registrado'})
        }else{
            if(params.username && params.nombre && params.password){
                bcrypt.hash(params.password, null, null, (err, passwordHashed) => {
                    if (err) {
                        return res.status(500).send({message: "Error al encriptar contraseña"});
                    } else if (passwordHashed) {
                        UsuarioModel.password = passwordHashed;
                        UsuarioModel.nombre = params.nombre;
                        UsuarioModel.username = params.username;
                        UsuarioModel.rol ='ROL_Usuario'
                        UsuarioModel.save((err, userSaved) => {
                            if (err) {
                                return res.status(500).send({message: "Error al agregar empresa"});
                            } else if (userSaved) {
                               return res.status(500).send({message:'se registro correctamente',userSaved})
                            } else {
                                return res.status(500).send({message: "No se agregó la empresa"});
                            }
                        });
                    } else {
                        console.log("Contraseña de SuperAdmin no encriptada");
                    }
                });

            }
        }

    })


}



function editarUsuario(req,res){
    var userId = req.params.idUsuario;
    var update = req.body

    Usuario.findById(userId,(err,userFind)=>{
        if(err) {
            return res.status(500).send({mensaje:'error al encotrar el usuario'})
        } else if (userFind){
            Usuario.findOne({ username: update.username},(err,userFinded)=>{
                if(err){
                    return res.status(500).send({mensaje:'Error al encontrare el usuario'});

                }else if(userFinded){
                    if(userFinded.username=update.username){
                        Usuario.findByIdAndUpdate(userId,update,{new:true},(err,userUpdated)=>{
                            if(err){
                                return res.status(500).send({mensaje:'error en la peticion 2'});
                            }else if(userUpdated){
                                return res.status(500).send({message:'Usuario actualizado',userUpdated});
                            }
                        })
                    }else{
                        return res.status(500).send({message: "el Username ya existe"})
                    }
                    
                }else{
                    Usuario.findByIdAndUpdate(userId,update,{new:true},(err,userUpdated)=>{
                        if(err){
                            return res.status(500).send({message:'error en la peticion 3'});
                        
                        }else if (userUpdated){
                            return res.status(500).send({message:'Usuario Actualizado',userUpdated})

                        }
                    })
                }
            })
        }
    })
}

function eliminarUsuario(req,res){
    var userId= req.params.idUsuario;

    Usuario.findById(userId,(err,userFinded)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la peticion 1'});
        }else if(userFinded){

            Usuario.findByIdAndDelete(userId,(err,userRemoved)=>{
                if(err){
                    return res.status(500).send({mensaje:'error en petcion 2'});
                }else if(userRemoved){
                    return res.status(200).send({mensaje:'Usuario eliminado con exito',userRemoved})
                }
            })
        

        }else{
            return res.status(500).send({mensaje:'error el usuario no existe o ya fue eliminado'});

        }

    })
     
   
}

function ObternerUsuario(req,res){
    Usuario.find({rol:"ROL_Usuario"}).exec((err,usuarioEncontrados)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la peticion 1'})
        }else if(usuarioEncontrados){
            return res.status(200).send({mensaje:'los usuarios existentes son ',usuarioEncontrados})

        }else{

        }
    })

}


function ObtenerUsuarioxId(req,res){
    var userId= req.params.idUsuario;
    Usuario.findById(userId,(err,userFinded)=>{
        if(err){
            return res.status(500).send({mensaje:'error en la petcion 1'});
        }else if(userFinded){
            return res.status(200).send({mensaje:'usuario Encontrado',userFinded});
        }else{
            return res.status(500).send({mensaje:'eror al encontrar el usuario'});
        }
    })

}
module.exports={

    adminDefult,
    login,
    registrarAdmin,
    registrarAdminHotel,//pendiente
    registrarUsuario,
    editarUsuario,
    eliminarUsuario,
    ObternerUsuario,
    ObtenerUsuarioxId
}


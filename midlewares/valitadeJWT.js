
// Importamos json
const { response , request} = require('express')

// improtamos el JWT

const jwt = require('jsonwebtoken')

// imortamos el dmodelo
const Usuario = require('../models/usuario')


const validarJWT = async (req = request, res = response, next) => {
    // extramoes token de la cabecera
    const token = req.header('z-token')

    if(!token){
        return res.status(401).json({"msg":"No hay token en la peticion"});
    }

    try {
        // extramoes el id del usario
        const {uid} = jwt.verify(token, process.env.KEY_SECRET)

        // cconsutlamo el usuario
        const user = await Usuario.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Usuario no se encuentra en la BD'
            });
        }

        if(user.status == 0)
        {
            return res.status(401).json({
                msg: 'El usuario debe tener estado activo'
            })
        }

        // Guardamos en el request el usuario
        req.user = user

        next();

    } catch (error) {

        console.log(error)
        res.status(401).json({
            msg:'El Token No es valido'
        })
    }

};

module.exports = {
    validarJWT
}


const {response, request} = require('express'); 

// importar modelo
const Usuario = require('../models/usuario')

// importamos bycryks
const bcrypts = require('bcryptjs')

// Importar JWT
const {generarJWT} = require("../helper/generarJWT");


const login = async (req = request, res = response) => {

    const {
        username,
        password
    } = req.body    


    try {

        // Verificamos que exista
        const user = await Usuario.findOne({username})

        if(!user){
            return res.status(400).json({
                msg: "El correo ingresado no existe"
            })
        }
      
        if(user.status == 0){
            return res.status(400).json({
                msg:"Comuniquese con el administrador"
            })
        }

        // Comparamos que la contraseña sea la misma
        const Vpassword = bcrypts.compareSync(password, user.password)
        
        if(!Vpassword){
            return res.status(400).json({
                msg: 'La contraseña ingresada no es correcta'
            })
        }   

        // Generamos el JWT

        const token = await generarJWT(user._id)

        res.json({
            msg: "Todo esta bien",
            user, 
            token
        })
        
            
        } catch (error) {
            console.log(error)

            res.status(500).json({
                msg: 'Hable con el administrador'
            })
        }



    console.log("lleguaste")

}

  const renewToken = async (req, res = response) => {

        try {
            // Obtener usaurio de la request
            const { user } = req;

            // Nuevo token
            const token = await generarJWT(user._id);

            res.json({
                user,
                token    
            })

        } catch (error) {
            console.log(error)

            return res.status(401).json({
                msg:"plop"   
            })
        }
    


    }

module.exports = {
    login,
    renewToken
}
const {response, request} = require('express'); 

// im,portamos modelo
const Usuario = require('../models/usuario')

// importamos bcrtype
const bcryptjs = require('bcryptjs')

    const registroPost = async (req = request, res = response) => {
        // Extraemos

        try {
            
            const {status, created, updated, ...otros} = req.body
            
                //  Guardar registro
                const usuario = new Usuario(otros);

               // Generemoas el salt por default es 10
                const salt = bcryptjs.genSaltSync();

                // Encriptamos el passwordd
                usuario.password= bcryptjs.hashSync(otros.password, salt);

                // gUARDAMOS
                 await usuario.save();
  
            
            res.status(201).json({
                msg:"Se ha registrado correctamente"
            });


        } catch (error) {
            console.log(error)

            res.status(400).json({
                msg:"Tenemos problema con registrar sus datos",
            });

        }

    
    }

    const consultarGet = async (req = request, res = response) => {
        try {
            
             const query = {status:true}

             const data = await Usuario.find(query);

            res.status(201).json({
                msg:"Consulta realizada correctamente",
                data
            });


        } catch (error) {
            console.log(error)

            res.status(400).json({
                msg:"Tenemos problema con registrar sus datos",
            });

        }
    }



module.exports = {
    registroPost,
    consultarGet
  
}
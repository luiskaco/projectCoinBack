// Importamos JWT
const jwt = require('jsonwebtoken')

const generarJWT = ( uid = '') => {  
    // Guardamos en una promesa
    return new Promise( (resolve, reject) => {

        // Generar el JSONWEB
        const payload = {uid}; // extramos el id del usuario

        // Firmar JWt
        jwt.sign(payload, process.env.KEY_SECRET,{ expiresIn: parseInt(process.env.TTL) }, 
         (err, token) => {

            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }else{
              //  console.log(token);
                resolve(token)
            }    
          });

    });
}

module.exports = {
    generarJWT
}
// importando mdulo de rutas de express
const {Router} = require('express');

// Importamos valdiaciones
const { check } = require('express-validator');

// importamos middleaware
const {validate, validarJWT} = require('../midlewares');

// importando controllador
const {
       registroPost,
       consultarGet
    } 
    = require('../controllers/usuarioControllers')

    
const router = Router();
        // Definimos ls rutas
        router.post('/',
            [   

                check('username', 'El username no es valido').isEmail(),
                check('username', 'La username es obligatoria').not().isEmpty(),
                check('password', 'La contrasela es obligatoria').not().isEmpty(),

                check('country_code', 'La country_code es obligatoria').not().isEmpty(),
                check('country_code', 'La country_code es obligatoria').isInt(),

                check('phone', 'La phone es obligatoria').not().isEmpty(),
                check('phone', 'La phone es obligatoria').isInt(),

                check('fname', 'La fname es obligatoria').not().isEmpty(),
                check('lname', 'La fname es obligatoria').not().isEmpty(),

                check('address', 'La address es obligatoria').not().isEmpty(),

                check('birthdate', 'La birthdate es obligatoria').not().isEmpty(),

                // valdiate
                validate
            ],registroPost)
        
        router.get('/',validarJWT, consultarGet)


// Exportamos las rutas
module.exports = router;
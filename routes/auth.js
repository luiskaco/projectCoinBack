// importando mdulo de rutas de express
const {Router} = require('express');

const {login, renewToken} = require('../controllers/authController')

const router = Router();

// Importamos valdiaciones
const { check } = require('express-validator');

// importamos middleaware
const {validate, validarJWT} = require('../midlewares');

router.post('/login', 
 [
    check('username', 'El username no es valido').isEmail(),
    check('username', 'La username es obligatoria').not().isEmpty(),
    check('password', 'La contrasela es obligatoria').not().isEmpty(),

    // valdiate
    validate
 ],

login)

// renovamos token
router.get('/renew', validarJWT, renewToken);

// Exportamos las rutas
module.exports = router;
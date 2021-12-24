const validate = require('../midlewares/validate');
const validarJWT = require('../midlewares/valitadeJWT');


module.exports = {
    ...validate,
    ...validarJWT

}
const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
       fname:{
           type:String, 
            required: [true, 'El nombre es Obligatorio']
       },
       lname:{
           type:String, 
            required: [true, 'El Apellido es Obligatorio']
       },
       country_code:{
           type:Number ,
            required: [true, 'El codigo de ciudad es Obligatorio']
       },
       phone:{
           type:String, 
            required: [true, 'EL número de teléfono es Obligatorio']
       },
       address:{
           type:String,
            required: [true, 'La dirección debe ser Obligatoria']
       },
       birthdate:{
           type:String,
            required: [true, 'El cumpleaños debe ser Obligatoria']
       },
       status:{
           type:Number, 
           default:1,
       },
       username:{
           type:String, 
            required: [true, 'EL usuario de teléfono es Obligatorio'],
            unique:true,

       },
       password:{
        type:String, 
         required: [true, 'EL password de teléfono es Obligatorio']
    }
       

});


UsuarioSchema.methods.toJSON = function(){
    // Extraemos lo que no vamos a usar
    const {__v, password, _id,  ...usuario} = this.toObject();

    // Transforamos el id por uid
    usuario.uid = _id

    // Retornamos el usuario
    return usuario;

}


module.exports = model('Usuario', UsuarioSchema)
// importano mongpse
const  mongoose = require('mongoose')

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        })

        console.log("Hemos conectado la Base de Datos")
        
    } catch (error) {
            console.log(error)

            throw new Error('Tenemos un problema conectando la BD')
    }

}


module.exports = dbConnection
    
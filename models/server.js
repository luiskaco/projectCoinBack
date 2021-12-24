// Importamos express
const express = require('express')

// importando cors
const cors = require('cors')

// importando conexion de dB
const dbConnection = require('../db/config.db')

// Creando clase de server
class Server {

    constructor(){
        // inicializamos express
        this.app = express();
        // puerto
        this.port = process.env.PORT;

        // mapa de ruta
          this.paths = {
                auth: '/api/auth',
                registro: '/api/usuario',
          }
          

        // Conectar a BD
        this.conectarDB();

             // middleware
            this.middlewares();

        this.route();

    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares(){

        // Habilitando el cors
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json()) 

        // Directorio publico - Por si
        this.app.use( express.static('public'))
    }

    // metodo
    route() {
        // Defino ruta
        this.app.use(this.paths.registro , require('../routes/usuarios'))
        this.app.use(this.paths.auth , require('../routes/auth'))
    }

    listen(){
         
        this.app.listen(this.port , () => {
                 console.log('Servidor ejecutando en el puerto ' + this.port)
        })
    }

}

module.exports = Server;
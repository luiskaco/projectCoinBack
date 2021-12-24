
// importanmos 
require('dotenv').config(); 

// importamos server
const Server = require('./models/server');

// instnciamos el server
const server = new Server();

// Llamamos el metodo
server.listen();


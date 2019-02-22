require('./config/config');

const express = require('express');

//socket.io no trabaja directamente con express, si no que lo hace mediante servidores http
//por ello, es necesario importar el paquete http de node.
const socketIO = require('socket.io');
const http = require('http');


const app = express();
//creamos el servidor con las configuraciones de express
let server = http.createServer(app);


const path = require('path');
//hacemos pública la carpeta public.
const publicPath = path.resolve(__dirname, '../public');

//midleware para habilitar la carpeta pública
app.use(express.static(publicPath));

//IO=es la comunicación directa del backend. Nos dirá por ej usuarios conectados, cambios ,etc
//let io = socketIO(server);
module.exports.io = socketIO(server);
require('./sockets/socket');


app.get('/', (req, res) => {

});


//en vez de llamar a app.listen, lo hacemos a server.listen, ya que éste tiene la configuración de express 
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Escuchando en el puerto: ${process.env.PORT}`);
});
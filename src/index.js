import express from 'express';
import morgan from 'morgan';
import {Server}from 'socket.io';
import http from 'http';
import routeHome from './routes/home.js';
import Api from './apiClass.js';
import { tableMessages, tableProducts } from './tables.js';
import { options } from './configDB.js';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);  //implementación de websocket
const PORT = process.env.PORT || 8080;  // puerto de conexión
const message = new Api(options.sqlite3,'mensajes');
const product = new Api(options.mariaDB,'productos');

tableProducts(); // crear tabla productos en base de datos mariaDB
tableMessages(); // crear tabla mensajes en base de datos sqlite3

//Websockets
const centerMessage=async()=>{
    const result = await message.getAll();
    if(result.length!==0){
        return result
    }
}
io.on('connection',async(socket)=>{   //conectar websocket
    console.log('cliente conectado',socket.id);
    let data = await product.getAll(); //obtener productos
    const getMessage = await message.getAll() ;  //obtener mensajes
    io.sockets.emit('resultData',data);  //enviar información de productos a cada cliente
    io.sockets.emit('messages',getMessage); // enviar mensajes - centro de mensajes
    socket.on('newMessage',async(data)=>{
        await message.create(data); // guardar mensajes
        const getMessage = await message.getAll() ;  //obtener mensajes
        io.sockets.emit('addMessage',getMessage);
    });
});

// views - motores de plantilla
app.set('views', './src/views');
app.set('view engine', 'ejs');  //motor de plantillas EJS

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('public'));

//routes
app.use('/', routeHome);

//connection server
try {
    httpServer.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}

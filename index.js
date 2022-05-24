const fs =require('fs');
const express = require('express');
const morgan = require('morgan');
const {Server:ioServer} = require('socket.io');
const http=require('http');
const app = express();
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);  //implementación de websocket
const PORT = process.env.PORT || 8080;  // puerto de conexión
const routeHome = require('./routes/home');
const Product = require('./apiClass');
const product = new Product();
let messages = [];

// obtener mensajes

const centerMessage=async()=>{
    try {
        let dataMessages = await fs.promises.readFile(__dirname+'/messages.txt','utf-8');  //obtener mensajes anteriores
        if (dataMessages){  //si existen mostrarlos
            let saveMessage=JSON.parse(dataMessages);
            messages = saveMessage    
        }   
    } catch (error) {
        console.log('Error al buscar mensajes anteriores',error);
    }
};
centerMessage();
// guardar mensajes
const addMessage=async()=>{
    try {
        let saveMessage = JSON.stringify(messages);
        fs.promises.writeFile(__dirname+'/messages.txt',saveMessage);    
    } catch (error) {
        console.log('Error al guardar mensajes',error);
    }
}

//Websockets

io.on('connection',(socket)=>{   //conectar websocket
    console.log('cliente conectado',socket.id);
    let getData = product.getProducts();
    io.sockets.emit('resultData',getData);  //enviar información de productos a cada cliente 
    io.sockets.emit('messages',messages); // enviar mensajes - centro de mensajes
    socket.on('newMessage',(data)=>{
        messages.push(data);
        io.sockets.emit('addMessage',messages);
        addMessage()
    });
});


// views - motores de plantilla
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');  //motor de plantillas EJS

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

//routes
app.use('/', routeHome);

//connection server
try {
    httpServer.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}

const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080;
const routeProducts = require('./routes/products');
const routeHome = require('./routes/home');


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
app.use('/productos', routeProducts);


//connection server
try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}




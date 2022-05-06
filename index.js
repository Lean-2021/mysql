const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080;
const routeProducts = require('./routes/products');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//routes
app.use('/api/productos', routeProducts);


//connection server
try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}




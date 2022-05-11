const { Router } = require('express');
const Products = require('../apiClass');
const router = Router();
const product = new Products();
const uploadFile = require('../multer');

router.get('/', (req, res) => {     //mostrar la lista de productos
    res.render('listProduct', {
        title: 'Productos - Infoweb',
        listProducts: product.getProducts()
    });
});

router.post('/', uploadFile(), (req, res) => {  // crear un nuevo producto
    const { title, price } = req.body;

    if (!req.file) {   //comprobar que se hay seleccionado imagen en caso contrario mostrar error
        return res.json({ message: 'no de ingreso la imagen' })
    }

    const thumbnail = req.file.filename;
    const newProduct = new Products(
        title,
        price,
        thumbnail
    )
    product.createProduct(newProduct);  // crear producto
    res.redirect('/');  //redireccionar al formulario de ingreso de productos
});


module.exports = router;

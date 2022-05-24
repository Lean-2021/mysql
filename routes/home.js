const { Router } = require('express');
const router = Router();
const Products = require('../apiClass');
const product = new Products();
const uploadFile = require('../multer');

router.get('/', (req, res) => {  //ruta principal -mostrar formulario de ingreso de productos    
    res.render('index', {
        title: 'Inicio -Infoweb',
        listProducts:product.getProducts()
    })
});
router.post('/', uploadFile(), (req, res) => {  // crear un nuevo producto
    const { title, price } = req.body;

    if (!req.file) {   //comprobar que se hay seleccionado imagen en caso contrario mostrar error
        return res.json({ message: 'no se ingreso la imagen' })
    }

    const thumbnail = req.file.filename;
    const newProduct = new Products(
        title,
        price,
        thumbnail
    )
    product.createProduct(newProduct);  // crear producto
    res.redirect('/')
   });

module.exports = router;
const { Router } = require('express');
const Products = require('../apiClass');
const router = Router();
const product = new Products();
const uploadFile = require('../multer');

router.get('/', (req, res) => {     //mostrar la lista de productos
    res.json(product.getProducts());
});

router.get('/:id', (req, res) => {  //mostrar producto segun el id
    const { id } = req.params;
    const numId = parseInt(id)
    const productResult = product.findById(numId);
    if (productResult) {  // comprobar si existe o no el producto
        res.json(productResult)
    }
    else {
        res.json({ error: 'producto no encontrado' })
    };
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
    res.json(product.createProduct(newProduct));
});

router.put('/:id', uploadFile(), (req, res) => {   //actualizar un producto
    const { id } = req.params;
    const { title, price } = req.body;
    const thumbnail = req.file.filename;
    const numId = parseInt(id);
    const listProduct = product.getProducts();
    const resultFind = listProduct.find(product => product.id === numId);

    if (!req.file) {  //comprobar que se hay seleccionado imagen en caso contrario mostrar error
        return res.json({ message: 'no de ingreso la imagen' })
    };

    if (resultFind) {  //comprobar si existe el producto a actualizar
        const updateProduct = new Products(
            title,
            price,
            thumbnail
        )
        const update = product.updateProducts(numId, updateProduct);
        res.json(update);
    }
    else {
        res.json({ error: 'No existe el producto que se quiere actualizar' })
    }
});

router.delete('/:id', (req, res) => {  //eliminar un producto
    const { id } = req.params;
    const numId = parseInt(id);
    let list = product.getProducts();
    const resultFind = list.find(product => product.id === numId);

    if (resultFind) {  // comprobar si existe el producto a eliminar
        let newList = product.deleteById(numId);

        return res.json(newList);
    }
    else {
        res.json({ error: 'No existe el producto que se quiere eliminar' })
    }
});


module.exports = router;

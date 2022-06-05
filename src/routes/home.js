import { Router } from 'express';
import Products from '../apiClass.js';
import {options} from '../configDB.js'; 
const router = Router();
const product = new Products(options.mariaDB,'productos');

router.get('/', async(req, res) => {  //ruta principal -mostrar formulario de ingreso de productos    
    const all = await product.getAll();
    res.render('index', {
        title: 'Inicio -Infoweb',
        listProducts:{all}
    });
});
router.post('/', async(req, res) => {  // crear un nuevo producto
    const { title, price,thumbnail } = req.body;
    const newProduct={
        title,
        price,
        thumbnail
    }
    await product.create(newProduct);  // crear producto
    res.redirect('/')
   });

export default router
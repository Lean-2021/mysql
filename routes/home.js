const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {  //ruta principal -mostrar formulario de ingreso de productos
    res.render('index', {
        title: 'Inicio -Infoweb'
    })
});

module.exports = router;
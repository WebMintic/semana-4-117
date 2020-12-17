const routerx = require('express-promise-router');
const articuloRouter = require('./articulo.js');
const categoriaRouter = require('./categoria.js');
const usuarioRouter = require('./usuario.js');

//Definición del router
const router = routerx();

//Definición de las rutas para artículo, categoría y usuario
router.use('/articulo', articuloRouter);
router.use('/categoria', categoriaRouter);
router.use('/usuario', usuarioRouter);

module.exports = router;
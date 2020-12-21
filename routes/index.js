const routerx = require('express-promise-router');
const articuloRouter = require('./articulo');
const categoriasRouter = require('./categorias')
const userRoute = require('./user')



const router = routerx();

router.use('/articulo', articuloRouter);
router.use('/usuario', userRoute);
router.use('/categoria', categoriasRouter);


module.exports = router;
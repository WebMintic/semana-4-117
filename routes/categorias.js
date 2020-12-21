const routerx = require('express-promise-router');
const categoriaController = require('../controllers/CategoriaController');
const auth = require('../middlewares/auth');

const router = routerx();

// Listar categoria
router.get('/list', categoriaController.list); //.com/categoria/list

router.get('/list/:catId', categoriaController.list2);
// Registrar categoria
router.post('/add', categoriaController.add); //.com/categoria/register
// Actualizar categoria
router.put('/update', categoriaController.update); //.com/categoria/update

router.put('/activate', categoriaController.activate); //.com/categoria/activate

router.put('/deactivate', categoriaController.deactivate); //.com/categoria/activate
module.exports = router;
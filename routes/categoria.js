/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const categoriaController = require('../controllers/CategoriaController');
const auth = require('../middlewares/auth');

const router = routerx();

//Listado de métodos en el que se verifica el usuario Almacenero (y Administrador)
// router.get('/list', auth.verifyUsuario, categoriaController.list);
// router.post('/add', auth.verifyVendendor, categoriaController.add);
// router.put('/update', auth.verifyVendendor, categoriaController.update);
// router.put('/activate', auth.verifyVendendor, categoriaController.activate);
// router.put('/deactivate', auth.verifyVendendor, categoriaController.deactivate);
//Verificar los accesos autorizados

router.get('/list', categoriaController.list);
router.post('/add', categoriaController.add);
router.put('/update', categoriaController.update);
router.put('/activate', categoriaController.activate);
router.put('/deactivate', categoriaController.deactivate);

module.exports = router;
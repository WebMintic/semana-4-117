/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const articuloController = require('../controllers/ArticuloController');
const auth = require('../middlewares/auth');

const router = routerx();

//Listado de métodos en el que se verifica el usuario Almacenero (y Administrador)
// router.get('/list', auth.verifyUsuario, articuloController.list);
// router.post('/add', auth.verifyAlmacenero, articuloController.add);
// router.put('/update', auth.verifyAlmacenero, articuloController.update);
// router.put('/activate', auth.verifyAlmacenero, articuloController.activate);
// router.put('/deactivate', auth.verifyAlmacenero, articuloController.deactivate);
//Verificar los accesos autorizados

router.get('/list', articuloController.list);
router.post('/add', articuloController.add);
router.put('/update', articuloController.update);
router.put('/activate', articuloController.activate);
router.put('/deactivate', articuloController.deactivate);

module.exports = router;
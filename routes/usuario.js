/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

//Listado de métodos en el que se verifica el usuario Almacenero (y Administrador)
// router.get('/login', usuarioController.login);
// router.get('/register', auth.verifyAdministrador, usuarioController.register);
// router.get('/update', auth.verifyAdministrador, usuarioController.update);
// router.get('/list', auth.verifyAdministrador, usuarioController.list);

router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);
router.put('/update', usuarioController.update);
router.get('/list', usuarioController.list);


module.exports = router;  
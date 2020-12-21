/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

const router = routerx();

router.get('/list', auth.verifyUsuario, UserController.listar);
router.post('/add', UserController.register);
router.post('/login',  UserController.login);
router.put('/update',  UserController.update);
router.put('/activate', UserController.activate);
router.put('/deactivate', UserController.deactivate);

module.exports = router;
const Router = require('koa-router');
const homeController = require('./controllers/home');
const authenticationController = require('./controllers/authentication');

const router = new Router();
router.get('/', homeController.welcome);
router.get('/spec', homeController.showSwaggerSpec);

router.get('/user/login', authenticationController.userLogin);
router.get('/user/logout', authenticationController.userLogout);

module.exports = router;

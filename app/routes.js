const Router = require('koa-router');
const homeController = require('./controllers/home');
const authenticationController = require('./controllers/authentication');
const usersController = require('./controllers/users');

const router = new Router();
router.get('/', homeController.welcome);
router.get('/spec', homeController.showSwaggerSpec);

router.get('/user/login', authenticationController.userLogin);
router.get('/user/logout', authenticationController.userLogout);

router.get('/user', usersController.getAllUsersRequest);

module.exports = router;

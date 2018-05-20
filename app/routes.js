const Router = require('koa-router');
const homeController = require('./controllers/home');
const authenticationController = require('./controllers/authentication');
const usersController = require('./controllers/users');

const router = new Router();
router.get('/', homeController.welcome);
router.get('/spec', homeController.showSwaggerSpec);

router.get('/user/login', authenticationController.userLogin);
router.get('/user/logout', authenticationController.userLogout);

// CRUD ROUTES
router.post('/user', usersController.addNewUserRequest);
router.get('/users', usersController.getAllUsersRequest);
router.get('/user/:userid', usersController.getUserByIdRequest);
// router.post('/user/update', usersController.addNewUserRequest);
// router.post('/user/delete', usersController.addNewUserRequest);

module.exports = router;

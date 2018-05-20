const Router = require('koa-router');
const homeController = require('./controllers/home');
const authenticationController = require('./controllers/authentication');
const usersController = require('./controllers/users');

const router = new Router();
router.get('/', homeController.welcome);
router.get('/spec', homeController.showSwaggerSpec);

// AUTHENTICATION
router.get('/user/login', authenticationController.userLogin);
router.get('/user/logout', authenticationController.userLogout);

// CRUD ROUTES
router.post('/user', usersController.addNewUserRequest);
router.get('/user', usersController.getAllUsersRequest);
router.get('/user/:userid', usersController.getUserByIdRequest);
router.put('/user/:userid', usersController.fullyUpdateUserRequest);
router.patch('/user/:userid', usersController.partiallyUpdateUserRequest);
router.delete('/user/:userid', usersController.deleteUserRequest);

module.exports = router;

'use strict';

var Router = require('koa-router');
var homeController = require('./controllers/home');
var authenticationController = require('./controllers/authentication');
var usersController = require('./controllers/users');

var router = new Router();
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
//# sourceMappingURL=routes.js.map
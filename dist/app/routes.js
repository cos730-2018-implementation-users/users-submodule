'use strict';

var Router = require('koa-router');
var homeController = require('./controllers/home');
var authenticationController = require('./controllers/authentication');
var usersController = require('./controllers/users');

var router = new Router();
router.get('/', homeController.welcome);
router.get('/spec', homeController.showSwaggerSpec);

// AUTHENTICATION
router.get('/user/login', authenticationController.userLogin);
router.get('/user/logout', authenticationController.userLogout);

// CRUD ROUTES
router.post('/user', usersController.addNewUserRequest);
router.get('/users', usersController.getAllUsersRequest);
router.get('/user/:userid', usersController.getUserByIdRequest);
router.put('/user/:userid', usersController.fullyUpdateUserRequest);
router.patch('/user/:userid', usersController.partiallyUpdateUserRequest);
router.delete('/user/:userid', usersController.deleteUserRequest);

module.exports = router;
//# sourceMappingURL=routes.js.map
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');

// Users Controller 
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/getUser', usersController.getUser);
router.post('/friend-request', usersController.friend_request);


module.exports = router;
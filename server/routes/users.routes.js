const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');

// Users Controller Routes

// authentication
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/getUser', usersController.getUser);
// friends request
router.post('/friend-request', usersController.send_friend_request);
router.get('/friend-request/:userId', usersController.get_friend_request);
router.post('/friend-request/accept', usersController.accept_friend_request);
router.get('/friends/:userId', usersController.find_friends);
router.get('/accepted-friends/:userId', usersController.accepted_friend_list);

module.exports = router;
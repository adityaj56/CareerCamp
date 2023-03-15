const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
const loginController = require('../controllers/login_controller')

router.post('/create-user', userController.createUser);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'}
    ),loginController.createSession);

router.get('/home', passport.checkAuthentication ,userController.home);

module.exports = router;
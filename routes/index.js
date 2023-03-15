const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login_controller');

router.get('/', loginController.loginPage);
router.get('/sign-up', loginController.signupPage);
router.get('/logout', loginController.logout);

router.use('/user', require('./users'));

module.exports = router;
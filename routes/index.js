const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login_controller');

router.get('/', loginController.loginPage);
router.get('/sign-up', loginController.signupPage);
router.get('/logout', loginController.logout);
router.get('/new-openings', function(req, res){
    return res.render('newOpenings',{
        title: 'new openings',
        layout: 'layouts/layout2'
    })
});

router.use('/user', require('./users'));
router.use('/student', require('./students'));
router.use('/interview', require('./interviews'));



module.exports = router;
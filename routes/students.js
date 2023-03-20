const express = require('express');
const router = express.Router()
const passport = require('passport');

const studentController = require('../controllers/student_controller');

router.post('/create', passport.checkAuthentication, studentController.create);
router.get('/download-csv', passport.checkAuthentication, studentController.downloadCSV);

module.exports = router;
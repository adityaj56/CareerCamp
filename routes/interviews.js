const express = require('express');
const router = express.Router();
const passport = require('passport')

const interviewController = require('../controllers/interview_controller')

router.get('/', passport.checkAuthentication, interviewController.page);

router.post('/create', passport.checkAuthentication, interviewController.create);
router.post('/add-student', passport.checkAuthentication, interviewController.addStudent);
router.post('/update-student-status', passport.checkAuthentication, interviewController.updateStudentStatus);

module.exports = router;
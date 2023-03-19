const express = require('express');
const router = express.Router();

const interviewController = require('../controllers/interview_controller')

router.get('/', interviewController.page);

router.post('/create', interviewController.create);
router.post('/add-student', interviewController.addStudent);
router.post('/update-student-status', interviewController.updateStudentStatus);

module.exports = router;
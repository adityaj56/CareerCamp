const Interview = require('../models/interview');
const Student = require('../models/student');

module.exports.page = async function(req, res){
    let interviewList = await Interview.find({}).populate({path: 'students'});
    let studentList =  await Student.find({});
    return res.render('interview',{
        title: 'Interviews',
        layout: 'layouts/layout2',
        interview_list: interviewList,
        student_list: studentList
    });
}

module.exports.create = async function(req, res){
    try{
        let interview = await Interview.create(req.body);
        console.log('Company created: ', interview);
        return res.redirect('back');
    }catch(err){
        console.log('Error occured while creating the company: ', err);
        return res.redirect('back');
    }

}

module.exports.addStudent = async function(req, res){
    try{
        let interview = await Interview.findById(req.body.interviewId)
        if(interview){
            let student = await Student.findById(req.body.addStudent);
            if(student){
                interview.students.push(req.body.addStudent);
                let newInterview = {
                    interview: req.body.interviewId,
                    status: 'on hold',
                    dateApplied: Date.now(),
                    dateOfInterview: req.body.dateOfInterview
                }
                student.interviews.push(newInterview);
                interview.save();
                student.save();
            }
        }
        return res.redirect('back');
    }catch(err){
        console.log("Error while adding a student to the interview! ", err);
        return res.redirect('back');
    }
}

module.exports.updateStudentStatus = async function(req, res){
    try {
        let student = await Student.findOneAndUpdate(
            {_id: req.body.studentid,'interviews.interview': req.body.interviewid},
            {$set: {'interviews.$.status': req.body.status}}
        )
        return res.redirect('back');
    } catch(error) {
        console.log("Error while updated status: ", error);
        return res.redirect('back');
    }
}



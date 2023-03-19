const User = require('../models/user');
const Student = require('../models/student');

module.exports.createUser = async function(req, res){
    let user = await User.findOne({email: req.body.email});
    if(user){
        console.log("User already exists!");
        return res.redirect('/sign-up');
    }
    else{
        let newUser = await User.create(req.body);
        return res.redirect('/');
    }
}

module.exports.home = async function(req, res){
    let studentList = await Student.find({});
    return res.render('home',{
        title: 'Home',
        layout: 'layouts/layout2',
        student_list: studentList
    })
}
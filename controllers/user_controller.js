const User = require('../models/user');

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

module.exports.home = function(req, res){
    return res.render('home',{
        title: 'Home',
        layout: 'layouts/layout2'
    })
}
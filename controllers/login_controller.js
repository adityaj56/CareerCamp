module.exports.loginPage = function(req, res){
    return res.render('login',{
        title: 'login',
        layout: 'layouts/layout1'
    });
}

module.exports.signupPage = function(req, res){
    return res.render('signup', {
        title: 'sign-up',
        layout: 'layouts/layout1'
    })
}

module.exports.createSession = function(req, res){
    return res.redirect('/user/home');
}
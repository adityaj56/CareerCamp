module.exports.loginPage = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('user/home');
    }
    return res.render('login',{
        title: 'login',
        layout: 'layouts/layout1'
    });
}

module.exports.signupPage = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('user/home');
    }
    return res.render('signup', {
        title: 'sign-up',
        layout: 'layouts/layout1'
    })
}

module.exports.createSession = function(req, res){
    return res.redirect('/user/home');
}

module.exports.logout = function(req, res){
    req.logout(function(err){
        if(err){
            console.log('Error in logging out the user: ', err);
            return res.redirect('/user/home');
        }
    });
    return res.redirect('/');
}
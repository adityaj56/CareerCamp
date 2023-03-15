const User = require('../models/user');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' 
},function(email, password, done){
    try{
        User.findOne({email: email}).then(function(user){
            console.log(user);
            if(!user ||  user.password != password){
                console.log('Username/password is incorrect!');
                return done(null, false);
            }
            return done(null, user);
        });
    }catch(err){
        console.log('Error ocurred in passport local authentication: ', err);
        return done(err);
    }
}));

passport.serializeUser(function(user, done){
    return done(null, user.id);
});

passport.deserializeUser(function(id,done){
    try{
        User.findById(id).then(function(user){
            return done(null, user);
        });
    }catch(err){
        console.log('Error in passport deserialization: ', err);
        return done(err);
    }
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}
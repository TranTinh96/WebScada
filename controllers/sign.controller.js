var User = require("../models/sign.model");
var LocalStrategy   = require('passport-local').Strategy;


module.exports = function(Passport) {

   Passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    Passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    Passport.use('local', new LocalStrategy({
        usernameField : 'name',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, name, password, done) { 

        User.findOne({ 'local.name' : name }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found !')); 

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Wrong password !')); 

            return done(null, user);
        });

    }));
};

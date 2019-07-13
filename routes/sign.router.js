var User = require("../models/sign.model.js");
var middleware=require("../middleware/sign.middleware");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app, Passport) {


     app.get('/signin', function(req, res) {
         res.render('sign/signin', { message: req.flash('loginMessage') }); 
     })
     

    app.post('/signin', Passport.authenticate('local', {
         successRedirect : '/home',
         failureRedirect : '/signin', 
         failureFlash : true
     }));


     app.get('/signup', function(req, res) {
        res.render('sign/signup', { message: req.flash('signupMessage') });
    });

    
    app.post('/signup',urlencodedParser,middleware.postSignup)


     app.get('/forgottenPassword', function(req, res) {
        res.render('sign/password');
    })
     

     app.get('/signout', function(req, res) {
         req.logout();
         res.redirect('/');
     });
}

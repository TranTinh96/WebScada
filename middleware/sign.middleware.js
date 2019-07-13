
var User = require("../models/sign.model.js");



 module.exports.postSignup=function(req,res,next)
 {
        var newUser     = new User();
        var fullname =req.body.fullname;
        var email =req.body.email;
        var name =req.body.name;
        var authorization=req.body.authorization;
        var password_again =req.body.password_again;
        var password =req.body.password;
        var agree =req.body.agree;   
        if( password_again==password  && agree=="on")
        {   
            newUser.local.fullname         =  fullname;
            newUser.local.email            =  email;
            newUser.local.name             =  name;
            newUser.local.authorization    =  authorization;
            newUser.local.password = newUser.generateHash(password);
            newUser.save(function(err) {
                if (err)throw err;
            });
            res.redirect("/signin")
        }
        else{
            req.flash('signupMessage', 'Incorrect Password  or Agree !')
            res.redirect("/signup");          
        }
 }
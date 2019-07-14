var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Passport = require('passport');
var flash    = require('connect-flash');
var expressSession = require('express-session');


var app = express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);





app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

require("./middleware/index.middleware")(mongoose);
require('./controllers/sign.controller')(Passport);


app.use(expressSession({
     secret: 'mySecretKey'
}));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(flash()); 


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home.router'); 
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
require("./routes/sign.router.js")(app,Passport);
function isLoggedIn(req, res, next) {
     if (req.isAuthenticated())
     {  
         users = req.user;
         res.locals.users=users;
         return next();
     }         
     res.redirect('/signin');
 };


//Modbus Serial/TCP

require("./modbus.client/io.modbus")(app,io);

/*
*
--------------------------------------OPC UA---------------------------------
*
*/
require("./ua.client/ua.url")(app);
require("./ua.client/ua")(app);

app.get("/giaodien",function(req,res,next){
    res.render("giaodien");
})

 server.listen(process.env.PORT || '3000');
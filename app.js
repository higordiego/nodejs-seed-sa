var express = require('express')
, path = require('path')
, favicon = require('serve-favicon')
, logger = require('morgan')
, cookieParser = require('cookie-parser')
, bodyParser = require('body-parser')
, load = require('express-load')
, passportLocal = require ('passport-local')
, passport = require('passport')
, passportHttp  = require('passport-http')
, expressSession = require('express-session')
, expressValidator = require('express-validator')
, mongoose = require('mongoose')
, randomToken = require('random-token')
, BearerStrategy = require('passport-http-bearer').Strategy
, cors = require('cors')
, flash = require('express-flash')
, app = express();

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(flash());
//Acessar arquivos publico
app.use(express.static(path.join(__dirname, 'public')));
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Gerador de cookie
app.use(cookieParser('iY}ONxQ,Y9I^Z}&y6-i}~35cS/vk/sf8+y@8c.2></>P*Z03Xhue?lzY%|dzN>S'));
app.use(expressSession({
  secret: process.env.SESSION_SECRET || '1a5H(qzO&1+!8M35tXvai3A*JF%Os]eOoG63/Oo+:1S(R[%x[js09UKDam0#85',
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: true
    }
  })
);


//inicialização passaport
app.use(passport.initialize());
//Usando passport session
app.use(passport.session());
//Strategia autenticador token.
passport.use(new BearerStrategy(
  function(token, done) {
    // Importando o modelo..
    var User = app.models.user;
    User.findOne({ token: token }, function (err, user) {
      if (err) { 
        return done(err); 
      }
      if (!user) { 
        return done(null, false); 
      }
      return done(null, user, { scope: 'all' });
    });
  }
  ));


//Passport local para sessão de login
passport.use(new passportLocal.Strategy({
  usernameField: 'login',
  passwordField: 'password',

},verificaLogin));
passport.use(new passportHttp.BasicStrategy(verificaLogin));

function verificaLogin(username, password, done){
  var pass = require('./app/middleware/password');
  var User = app.models.user;
  var gerador = randomToken(32);
  User.findOne({ 'email': username }, function (err, resultAll) {
    if(err) { console.log("ERROR: " + err); }
    else {
      if(resultAll){
        if(resultAll.email == username && pass.validate(resultAll.password, password)) {
          //Gerando um novo token.
          User.update({id: resultAll._id},{$set: {token: gerador}},function(err,result){
            result = resultAll;
            result.token = gerador; 
            done(null, result);  
          })
        } else {

          done(null, null);
        }
      } else {

        done(null, null);
      }
    }
  });
}


passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(user, done){
  done(null, user);
});


load('models',{cwd: 'app'})
.then('controllers')
.then('routes')
//.then('config')
.into(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


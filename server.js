/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const sass = require('node-sass-middleware');
const multer = require('multer');
const exphbs = require("express-handlebars");
const favicon = require('serve-favicon');
const enforce = require('express-sslify');
const cronJob = require('cron').CronJob;

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const entryController = require('./controllers/entry');
const notificationController = require('./controllers/notification');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');


/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
      req.path == '/account') {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));


/**
 * Primary app routes.
 */

app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
app.get('/notification', passportConfig.isAuthenticated, notificationController.getNotification);
app.post('/notification/update', passportConfig.isAuthenticated, notificationController.postUpdateNotification);
app.get('/entry', passportConfig.isAuthenticated, entryController.newEntry);
app.post('/entry', passportConfig.isAuthenticated, entryController.postNewEntry);
app.get('/am', passportConfig.isAuthenticated, entryController.medMorning);
app.post('/am', passportConfig.isAuthenticated, entryController.postMedMorning);
app.get('/pm', passportConfig.isAuthenticated, entryController.medEvening);
app.post('/pm', passportConfig.isAuthenticated, entryController.postMedEvening);
app.get('/done', passportConfig.isAuthenticated, entryController.entryFinish);
app.post('/done', passportConfig.isAuthenticated, entryController.postEntryFinish);
app.get('/entry1', passportConfig.isAuthenticated, entryController.entryOne);
app.post('/entry1', passportConfig.isAuthenticated, entryController.postEntryOne);
app.get('/entry2', passportConfig.isAuthenticated, entryController.entryTwo);
app.post('/entry2', passportConfig.isAuthenticated, entryController.postEntryTwo);
app.get('/entry3', passportConfig.isAuthenticated, entryController.entryThree);
app.post('/entry3', passportConfig.isAuthenticated, entryController.postEntryThree);
app.get('/entry4', passportConfig.isAuthenticated, entryController.entryFour);
app.post('/entry4', passportConfig.isAuthenticated, entryController.postEntryFour);
app.get('/entry5', passportConfig.isAuthenticated, entryController.entryFive);
app.post('/entry5', passportConfig.isAuthenticated, entryController.postEntryFive);
app.get('/entry6', passportConfig.isAuthenticated, entryController.entrySix);
app.post('/entry6', passportConfig.isAuthenticated, entryController.postEntrySix);
app.get('/entry7', passportConfig.isAuthenticated, entryController.entrySeven);
app.post('/entry7', passportConfig.isAuthenticated, entryController.postEntrySeven);
app.get('/entry8', passportConfig.isAuthenticated, entryController.entryEight);
app.post('/entry8', passportConfig.isAuthenticated, entryController.postEntryEight);
app.get('/entry9', passportConfig.isAuthenticated, entryController.entryNine);
app.post('/entry9', passportConfig.isAuthenticated, entryController.postEntryNine);
app.get('/entry10', passportConfig.isAuthenticated, entryController.entryTen);
app.post('/entry10', passportConfig.isAuthenticated, entryController.postEntryTen);
app.get('/entry11', passportConfig.isAuthenticated, entryController.entryEleven);
app.post('/entry11', passportConfig.isAuthenticated, entryController.postEntryEleven);
app.get('/entry12', passportConfig.isAuthenticated, entryController.entryTwelve);
app.post('/entry12', passportConfig.isAuthenticated, entryController.postEntryTwelve);
app.get('/entry13', passportConfig.isAuthenticated, entryController.entryThirteen);
app.post('/entry13', passportConfig.isAuthenticated, entryController.postEntryThirteen);
 /**
  * OAuth authentication routes. (Sign in)
  */
 app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
 app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
   res.redirect(req.session.returnTo || '/');
 });

 /**
  * Error Handler.
  */
 app.use(errorHandler());

// On heroku use Heroku Scheduler for cron jobs since heroku sleeps

new cronJob( '43 10 * * *', function(){
  notificationController.pushMorning();
},  null, true,'America/Chicago');

 new cronJob( '30 08 * * *', function(){
   notificationController.pushMorning();
 },  null, true,'America/Chicago');

 new cronJob( '30 20 * * *', function(){
   notificationController.pushEvening();
 },  null, true,'America/Chicago');


 /**
 * Start Express server.
 */

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;

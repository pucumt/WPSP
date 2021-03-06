var path = require('path'),
  express = require('express'),
  nunjucks = require('nunjucks'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  //MongoStore = require('connect-mongo')(session),
  //flash = require('connect-flash'),
  multer = require('multer'),

  routes = require('./routes/index.js'),
  settings = require('./settings'),

  fs = require('fs'),
  accessLog = fs.createWriteStream('access.log', {
    flags: 'a'
  }),
  errorLog = fs.createWriteStream('error.log', {
    flags: 'a'
  }),

  app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
//app.set('view engine', 'html');
//app.engine('html', swig.renderFile);
app.use(favicon(__dirname + '/public/default/assets/images/favicon.ico'));
app.use(logger('dev'));
app.use(logger('combined', {
  stream: accessLog
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

//define upload address
app.use(multer({
  dest: './public/images',
  rename: function (fieldname, filename) {
    return filename;
  }
}));

app.use(cookieParser());
//session could save in mongo store, but sometimes it doesn't work
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db, //cookie name
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30
  }, //30 days
  resave: false,
  saveUninitialized: true //,
    //store: new MongoStore({
    //  db: settings.db,
    //  host: settings.host,
    //  port: settings.port
    //})
}));
//app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);
//error log in the file
app.use(function (err, req, res, next) {
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.cookieParser());
  app.use(express.session({ secret: 'nimble' }));

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

app.use(function(req, res, next){
  res.render('404', { status: 404, url: req.url, title: '404 - Page Not Found' });
});

app.use(function(err, req, res, next){
  res.render('500', {
      status: err.status || 500
    , error: err
	, title: 'Oops something bad happened'
  });
});

// load routes
require('./routes')(app);

// load socket.io
require('./socket.io/index')(app);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

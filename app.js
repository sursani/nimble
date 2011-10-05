
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

var sio = require('socket.io');

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

// load routes
require('./routes')(app);

// load socket.io
//require('./serversocketio')(app);

// socket io code
var io = sio.listen(app);

io.sockets.on('connection', function (socket) {
	socket.on('serverSend', function (msg, fn) {
		socket.emit('serverSend2', msg + ' bababa');
		fn();
	});
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

/**
 * Module dependencies.
 */
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
const 
  app = express().use(bodyParser.json());

//app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

//var express = require('express');
var logger = require('morgan');
var session = require('express-session');
//var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');
//var app = express().use(body_parser.json();
var server = http.createServer(app);
// var io = require('socket.io').listen(server)
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('databases/alisdb');

// settings

// set our default template engine to "jade"
// which prevents the need for extensions
app.engine('.html', require('ejs').__express);
app.listen((process.env.PORT || 5000), () => console.log('El servidor webhook esta escchando!'));

app.set('view engine', 'html');

// set views for error and 404 pages
app.set('views', __dirname + '/views');

// define a custom res.message() method
// which stores messages in the session

// log
if (!module.parent) app.use(logger('dev'));

// serve static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/bower_components'));

// session support
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'some secret here'
}));

// parse request bodies (req.body)
app.use(bodyParser.urlencoded({ extended: true }));

// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));

// load controllers
require('./lib/boot')(app, { verbose: !module.parent });

app.use(function(err, req, res, next) {
    // log it
    if (!module.parent) console.error(err.stack);

    // error page
    res.status(500).render('5xx');
});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Check if a token and mode were sent
  if (mode && token) {
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

// assume 404 since no middleware responded
app.use(function(req, res, next) {
    res.status(404).render('404', { url: req.originalUrl });
});

// var tcpCon = require('./lib/telnet');
// tcpCon.run(io);

server.listen(8080);
// [START app]
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var nodeFunction = require('./src/nodeFunction');

var app = express();

app.use('/', function(req,res, next) {
  console.log("Request url:", req.path);
  console.log("Request content-type:", req.get('Content-Type'));
  next();
});
app.use(bodyParser.json());

// Enforce json on api calls
app.use('/api/', function(req, res, next) {
  if (!req.is('json')) {
    return res.sendStatus(400);
  }
  next();
});

app.get('/', function (req, res) {
  res.status(200).send('{"value":1}');
});

app.post('/api/node', function (req, res) {
  console.log(req.body);
  var ret = nodeFunction.nodeFunction(req.body)
  console.log("ret:", ret);
  res.status(200).send(ret);
});

// Start the server
var server = app.listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
// [END app]

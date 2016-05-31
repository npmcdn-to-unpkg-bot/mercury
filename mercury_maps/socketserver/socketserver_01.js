var express = require('express'),
    app = express(),
    morgan = require('morgan'),
	bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

var net = require('net');
var HOST = '127.0.0.1';
var clientPORT = 4001;

// add logging middleware
app.use(morgan('dev'));
// parsing get
app.use(bodyParser.json());

app.get('/processdata', function(req, res, next){
  var client = new net.Socket();
  client.connect(clientPORT, HOST, function(err) {
      console.log('CONNECTED TO: ' + HOST + ':' + clientPORT);
      if (err)  return next(err);
      client.write(JSON.stringify('12345'));
  });

  client.on('error', function() {
      console.log('Connection error');
      client.destroy();
      res.redirect("/");
  });

  client.on('data', function(data) {
      console.log("Received data!" );
      client.destroy();
      //data recevied
      console.log('data: ' + data);
      res.redirect("/");
  });
});
app.listen(port);
console.log('server started on port %s', port);


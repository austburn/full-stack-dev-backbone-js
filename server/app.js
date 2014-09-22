var express, logger, path, app;

express = require('express');
logger = require('morgan');
path = require('path');

app = express();
app.use(express.static(__dirname + '/public'));
app.use(logger('dev', { immediate: true }));

app.get('/static/bundle.js', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../static/bundle.js'));
});

app.get('/static/style.css', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../static/style.css'));
});

app.get('/', function (req, res) {
  var html = path.resolve(__dirname + '/../index.html');
  res.sendFile(html);
});

server = app.listen(7111);
console.log('server is running on port http://127.0.0.1:' + server.address().port);

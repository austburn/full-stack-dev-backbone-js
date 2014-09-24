var server;

server = require('pushstate-server');

server.start({
  port: 7111,
  directory: './static'
});
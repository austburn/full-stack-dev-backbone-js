var restify, _, movies, server, port, ds, datastore;


restify = require('restify');
_ = require('underscore');
movies = require('./movies.json');
ds = require('./ds');

datastore = new ds();

server = restify.createServer({ name: 'movies' });
port = 7001;

server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.get('/api/movies', function (req, res) {
  return datastore.allMovies()
    .then(function(m) { res.send(m); })
    .catch(function(err) { res.send(500, err); });
});

server.get('/api/genres', function (req, res) {
  datastore.allGenres()
    .then(function (m) { res.send(m); })
    .catch(function (err) { res.send(500, err); });
});

server.get('/api/movies/:key', function (req, res) {
  return datastore.find(req.params.key)
    .then(function (m) { res.send(m); })
    .error(function (e) { res.send(404, {err: e.message}); })
    .catch(function (err) { res.send(500, err); });
});

server.put('api/movies/:key', function (req, res) {
  return datastore.voteMovie(req.params.key)
    .then(function (m) { res.send(m); })
    .error(function (e) { res.send(404, {err: e.message}); })
    .catch(function (err) { res.send(500, err); });
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
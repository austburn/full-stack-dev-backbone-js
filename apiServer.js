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
  return datastore.getMovies()
    .then(function (m) { res.send(m); });
});

server.get('/api/genres', function (req, res) {
  datastore.getGenres()
    .then(function (m) { res.send(m); })
    .catch(function (err) { res.send(500, err); });
});

server.get('/api/movies/:key', function (req, res) {
  return datastore.getMovie(req.params.key)
    .then(
      function (m) { res.send(m); },
      function (e) { res.send({statusCode: 404, error: e}); }
    );
});

server.put('/api/movies/:key', function (req, res) {
  return datastore.addVote(req.params.key)
    .then(
      function (m) { res.send(m); },
      function (e) { res.send({statusCode: 404, err: e}); }
    );
});

server.post('/api/users/create', function (req, res) {
  datastore.createUser(req.body)
    .then(
      function (user) { res.send({id: user.id, username: user.username }); },
      function (e) { res.send({statusCode: 404, err: e}); }
    );
});

server.post('/api/auth/session', function (req, res) {
  datastore.authenticateUser(req.body)
    .then(
      function (user) {
        res.header('Set-Cookie', 'session=' + user.token + '; expires=Thu, 1 Aug 2030 20:00:00 UTC; path=/; HttpOnly');
        res.send({ id: user.id, username: user.username, auth: 'success'});
      },
      function () {
        res.header('Set-Cookie', 'session=; HttpOnly');
        res.send({statusCode: 403, err: 'Auth Failed'});
      }
    );
});

server.get('/api/auth/session', function (req, res) {
  datastore.confirmSession(req).
    then(
      function (user) { res.send({ id: user.id, username: user.username, auth: 'success'}); },
      function (e) { res.send({statusCode: 404, err: e}); }
    );
});

server.del('/api/auth/session', function (req, res) {
  datastore.clearSession(req).
    then(
      function () {
        res.header('Set-Cookie', 'session=; HttpOnly');
        res.send({ statusCode: 200, auth: 'Session revoked.'});
      },
      function (e) {
        res.send({statusCode: 404, err: e});
      }
    );
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});

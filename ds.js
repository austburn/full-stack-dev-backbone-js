var fs, filename, _, Promise, sha1, bcrypt, Users, DS;

fs = require('fs');
_ = require('underscore');
Promise = require('promise');
sha1 = require('sha1');
bcrypt = require('bcrypt');
filename = './movies.json';

Users = [];

DS = function () {};

DS.prototype.movies = new Promise(function (fulfill, reject) {
  fs.readFile(filename, 'utf-8', function (err, res) {
    if (err) {
      reject(err);
    } else {
      fulfill(JSON.parse(res));
    }
  });
});

DS.prototype.getMovies = function () {
  return this.movies.then(function (movies) {
    var mapped = movies.map(function (m) {
      return {
        title: m.title,
        description: m.description,
        showtime: m.showtime,
        rating: m.rating,
        genres: m.genres,
        _key: sha1(m.title)
      };
    });
    return mapped;
  });
};

DS.prototype.getGenres = function () {
  return this.movies.then(function (movies) {
    var genres;

    genres = movies.map(function (m) {
      return m.genres;
    });

    return _.chain(genres)
             .flatten()
             .uniq()
             .value();
  });
};

DS.prototype.getMovie = function (key) {
  return this.movies.then(function (movies) {
    var match;
    match = _.find(movies, function (movie) {
      return sha1(movie.title) === key;
    });

    return new Promise(function (resolve, reject) {
      if (_.isUndefined(match)) {
        reject('Resource not found.');
      } else {
        resolve(match);
      }
    });
  });
};

DS.prototype.addVote = function (key) {
  return this.getMovie(key).then(
    function (m) {
      m.rating += 1;
      return m;
    }
  );
};

DS.prototype.isDuplicateUser = function (credentials) {
  var username, user;

  username = credentials.username;
  user = this._findUser(username);

  return new Promise(function (resolve, reject) {
    if (_.isUndefined(user)) {
      resolve(credentials);
    } else {
      reject('Username is taken.');
    }
  });
};

DS.prototype.createUser = function (body) {
  var credentials;
  credentials = JSON.parse(body);

  return this.isDuplicateUser(credentials).then(
    function () {
      var user;

      user = {
        userId:   Users.length + 1,
        username: credentials.username,
        email:    credentials.email
      };

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(credentials.password, salt, function (err, hash) {
          user.password = hash;

          Users.push(user);
        });
      });

      return {id: user.userId, username: user.username};
    }
  );
};

DS.prototype.authenticateUser = function (body) {
  var credentials;
  credentials = JSON.parse(body);

  return this._isPasswordValid(credentials).then(this._generateToken);
};

DS.prototype.confirmSession = function (req) {
  return this._hasValidSession(req);
};

DS.prototype.clearSession = function (req) {
  return this._hasValidSession(req).then(function (user) {
    user.token = null;
    return user;
  });
};

DS.prototype._generateToken = function (user) {
  var token;

  token = sha1(_.now().toString());
  user.token = token;

  return user;
};

DS.prototype._isPasswordValid = function (credentials) {
  var user;
  user = this._findUser(credentials.username);

  return new Promise(function (resolve, reject) {
    bcrypt.compare(credentials.password, user.password, function (err, res) {
      if (res) {
        resolve(user);
      } else {
        reject('Username or password is incorrect.');
      }
    });
  });
};

DS.prototype._findUser = function (username) {
  return _.findWhere(Users, {username: username});
};

DS.prototype._getCookies = function (req) {
  var cookies;

  cookies = {};

  if (req.headers && req.headers.cookie) {
    req.headers.cookie.split(';').forEach(function (cookie) {
      var parts;

      parts = cookie.match(/(.*?)=(.*)$/);

      cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
  }

  return cookies;
};

DS.prototype._hasValidSession = function (req) {
  var cookies, user;
  cookies = this._getCookies(req);

  user = _.findWhere(Users, {token: cookies.session});

  return new Promise(function (resolve, reject) {
    if (user) {
      resolve(user);
    } else {
      reject('Invalid session');
    }
  });
};

module.exports = DS;

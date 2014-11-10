var fs, filename, _, Promise, sha1, Movies, _mapAttributes,
  _mapAllAttributes, _find, DS;

fs = require('fs');
_ = require('underscore');
Promise = require('bluebird');
sha1 = require('sha1');
filename = './movies.json';

// Generates a set of fs functions appended with Async
// and wraps that function in a promise
Promise.promisifyAll(fs);

Movies = fs.readFileAsync(filename, 'utf-8').then(JSON.parse);

_mapAttributes = function (movie) {
  return {
    id: movie.id,
    title: movie.title,
    _key: sha1(movie.title)
  };
};

_mapAllAttributes = function (movie) {
  return {
    title: movie.title,
    description: movie.description,
    showtime: movie.showtime,
    rating: movie.rating,
    genres: movie.genres,
    _key: sha1(movie.title),
  };
};

_find = function (movies, key) {
  var match;

  match = _.find(movies, function (movie ) {
    return sha1(movie.title) === key;
  });

  if (!match) {
    throw Promise.RejectionError('ID not found!');
  } else {
    return match;
  }
};

_genres = function (movies) {
  return _.chain(movies)
          .map(function (movie) {
            return movie.genres
          })
          .flatten()
          .uniq()
          .value();
};

DS = function () {};

DS.prototype.allMovies = function () {
  return Movies.map(_mapAttributes);
};

DS.prototype.allGenres = function() {
  return Movies.then(function (movies) {
    return _genres(movies);
  });
};

DS.prototype.find = function(key) {
  return Movies.then(function (movies) {
    return _find(movies, key);
  })
  .then(_mapAllAttributes);
};

module.exports = DS;
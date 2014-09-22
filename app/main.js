var Backbone, $, Movies, MovieView, data, movies, MoviesList;

Backbone = require('backbone');
$ = require('jquery');
Backbone.$ = $;
Movies = require('collections/movies');
MovieView = require('views/movie');
MoviesList = require('views/moviesList');
data = require('../movies.json');

movies = new Movies(data);

module.exports = {
  movies: movies,
  MovieView: MovieView,
  MoviesList: MoviesList
};
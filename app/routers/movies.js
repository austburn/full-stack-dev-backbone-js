var Backbone, Movies, data, movies, MoviesList, MoviesRouter;

Backbone = require('backbone');
Movies = require('collections/movies');
data = require('../../../movies.json');
movies = new Movies(data);
MoviesList = require('views/moviesList');

MoviesRouter = Backbone.Router.extend({
  routes: {
    'movies/:id': 'selectMovie',
    '':           'showMain'
  },

  selectMovie: function (id) {
    this.moviesList.render();
    this.movies.selectByID(id);
  },

  showMain: function () {
    this.moviesList.render();
  },

  initialize: function (options) {
    this.movies = movies;
    this.moviesList = new MoviesList({
      el: options.el,
      collection: movies
    });
  }
});

module.exports = MoviesRouter;
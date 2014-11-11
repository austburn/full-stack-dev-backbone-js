var Backbone, Movies, Layout, Movie, MoviesRouter;

Backbone = require('backbone');
Movies = require('collections/movies');
Layout = require('views/layout');
Movie = require('models/movie');

MoviesRouter = Backbone.Router.extend({
  routes: {
    '':             'showMain',
    'details/:key': 'showDetails'
  },

  showMain: function () {
    this.movies.resetSelected();
    this.layout.setChose();
  },

  showDetails: function(key) {
    var movie, updateDetails;

    updateDetails = function (model) {
      this.layout.setDetails(model);
    }.bind(this);

    this.layout.render();
    movie = new Movie({_key: key});
    movie.fetch({
      success: updateDetails
    });

  },

  initialize: function () {
    this._initializeMovies();

    this.layout = Layout.getInstance({
      el: '.container',
      router: this
    });
  },

  _initializeMovies: function () {
    var deferReset;

    deferReset = function (results) {
      this.movies.reset(results);
      this.layout.render();
    }.bind(this);

    this.movies = new Movies();
    this.deferred = this.movies.fetch();
    this.deferred.done(function (results) {
      deferReset(results);
    });
  }
});

module.exports = MoviesRouter;
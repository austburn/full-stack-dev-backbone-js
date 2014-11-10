var Backbone, Movies, Layout, MoviesRouter;

Backbone = require('backbone');
Movies = require('collections/movies');
Layout = require('views/layout');
Movie = require('models/movie');

MoviesRouter = Backbone.Router.extend({
  routes: {
    'movies/:id':   'selectMovie',
    '':             'showMain',
    'details/:key': 'showDetails'
  },

  selectMovie: function (id) {
    this.layout.render();
    this.movies.selectByID(id);
    this.layout.setDetails(this.movies.get(id));
  },

  showMain: function () {
    this.movies.resetSelected();
    this.layout.setChose();
  },

  showDetails: function(key) {
    var movie = new Movie({_key: key});
    this.listenTo(movie, 'all', function(ev) { console.log(ev) });
    movie.fetch();
  },

  initialize: function () {
    this.movies = new Movies();
    this.layout = Layout.getInstance({
      el: '#movies',
      router: this
    });
  }
});

module.exports = MoviesRouter;
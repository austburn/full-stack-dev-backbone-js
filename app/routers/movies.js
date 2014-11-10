var Backbone, Movies, Layout, MoviesRouter;

Backbone = require('backbone');
Movies = require('collections/movies');
Layout = require('views/layout');

MoviesRouter = Backbone.Router.extend({
  routes: {
    'movies/:id': 'selectMovie',
    '':           'showMain'
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

  initialize: function () {
    this.movies = new Movies();
    this.layout = Layout.getInstance({
      el: '#movies',
      router: this
    });
  }
});

module.exports = MoviesRouter;
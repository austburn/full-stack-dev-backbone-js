var Backbone, MovieView, MoviesList;

Backbone = require('backbone');
MovieView = require('views/movie');

MoviesList = Backbone.View.extend({
  tagName: 'section',

  render: function () {
    var moviesView;

    moviesView = this.collection.map(function (movie) {
      return (new MovieView({model: movie, router: this.router})).render().el;
    }, this);

    this.$el.html(moviesView);
    return this;
  },

  initialize: function (options) {
    this.router = options.router;
    this.collection = options.collection;

    this.listenTo(this.collection, 'reset', this.render);
  }
});
module.exports = MoviesList;
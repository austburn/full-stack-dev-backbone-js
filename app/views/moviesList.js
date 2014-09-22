var Backbone, MovieView, MoviesList;

Backbone = require('backbone');
MovieView = require('views/movie');

MoviesList = Backbone.View.extend({
  tagName: 'section',
  render: function () {
    var moviesView = this.collection.map(function (movie) {
      return (new MovieView({model: movie})).render().el;
    });

    this.$el.html(moviesView);
    return this;
  }
});
module.exports = MoviesList;
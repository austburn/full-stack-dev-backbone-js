var Backbone, Movie, Movies;

Backbone = require('backbone');
Movie = require('models/movie');

Movies = Backbone.Collection.extend({
  model: Movie,

  url: '/api/movies',

  resetSelected: function () {
    this.each(function (model) {
      model.set({'selected': false});
    });
  },

  selectByID: function (id) {
    this.resetSelected();
    var movie = this.get(id);
    movie.set({'selected': true});
  }
});
module.exports = Movies;

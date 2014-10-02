var Backbone, Movie, Movies;

Backbone = require('backbone');
Movie = require('models/movie');

Movies = Backbone.Collection.extend({
  model: Movie,

  //Unselect all models
  resetSelected: function () {
    this.each(function (model) {
      model.set({'selected': false})
    });
  },

  //select a model from the collection
  selectByID: function (id) {
    this.resetSelected();
    var movie = this.get(id);
    movie.set({'selected': true});
  },

  sortByTitle: function () {
    return this.sortBy('title');
  },

  sortByRating: function () {
    return this.sortBy(function (mov) {
      return 10 - mov.get('rating');
    });
  },

  sortByShowtime: function () {
    return this.sortBy('showtime');
  }
});
module.exports = Movies;

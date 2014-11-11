var Backbone, _, $, ControlsView, Movies;

Backbone = require('backbone');
_ = require('underscore');
$ = Backbone.$;
Movies = require('collections/movies');

ControlsView = Backbone.View.extend({
  events: {
    'click #sort-by-title': 'sortByTitle',
    'click #sort-by-rating': 'sortByRating',
    'click #sort-by-showtime': 'sortByShowtime',
    'change select[name="genre"]': 'selectGenre'
  },

  sortByTitle: function () {
    this.collection.setSort('title');
  },

  sortByRating: function () {
    this.collection.setSort('rating');
  },

  sortByShowtime: function () {
    this.collection.setSort('showtime');
  },

  selectGenre: function () {
    var genre;

    genre = $('select[name="genre"]').val();

    this.collection.removeFilter('genre');
    this.collection.filterBy('genre', function (movie) {
      return movie.get('genres').indexOf(genre) !== -1 || genre === 'all';
    });
  }
});
module.exports = ControlsView;
var Backbone, ControlsView;

Backbone = require('backbone');
_ = require('underscore');
$ = Backbone.$;

ControlsView = Backbone.View.extend({
  events: {
    'click #sort-by-title': 'sortByTitle',
    'click #sort-by-rating': 'sortByRating',
    'click #sort-by-showtime': 'sortByShowtime',
    'change select[name="genre"]': 'selectGenre'
  },

  sortByTitle: function () {
    this.collection.reset(this.collection.sortByTitle());
  },

  sortByRating: function () {
    this.collection.reset(this.collection.sortByRating());
  },

  sortByShowtime: function () {
    this.collection.reset(this.collection.sortByShowtime());
  },

  selectGenre: function (ev) {
    var genre;

    genre = $('select[name="genre"]').val();

    if (genre === "all") {
      this.collection.reset(this.superset.toJSON());
    }
    else {
      this.collection.reset(this.superset.toJSON());
      this.filterByCategory(genre);
    }

  },

  filterByCategory: function (genre) {
    var filtered;

    filtered = this.collection.filter(function (mov) {
      return _.indexOf(mov.get('genres'), genre) !== -1
    });
    this.collection.reset(filtered);
  },

  initialize: function (options) {
    this.superset = options.superset;
  }
});
module.exports = ControlsView;
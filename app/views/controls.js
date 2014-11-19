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
    'change select[name="genre"]': 'selectGenre',
    'click #next-page': 'nextPage',
    'click #prev-page': 'prevPage'
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
  },

  checkPagination: function () {
    this.nextPageButton.disabled = !this.collection.hasNextPage();
    this.prevPageButton.disabled = !this.collection.hasPrevPage();
  },

  nextPage: function () {
    this.checkPagination();
    if (this.collection.hasNextPage()) {
      this.collection.nextPage();
    }
  },

  prevPage: function () {
    this.checkPagination();

    if (this.collection.hasPrevPage()) {
      this.collection.prevPage();
    }
  },

  initialize: function () {
    this.collection.setPerPage(5);
    this.nextPageButton = this.$('#next-page');
    this.prevPageButton = this.$('#prev-page');
  }
});
module.exports = ControlsView;

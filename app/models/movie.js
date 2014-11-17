var Backbone, Movie;

Backbone = require('backbone');

Movie = Backbone.Model.extend({
  defaults: {
    title: '',
    year: 0,
    description: '',
    selected: false,
    showtime: 0,
    rating: 0,
    director: '',
    genres: [],
    length: 0
  },

  idAttribute: '_key',

  urlRoot: '/api/movies',

  toShowtimeDate: function () {
    var d = new Date();
    d.setUTCSeconds(this.get('showtime'));
    return d;
  },

  showtimeToString: function () {
    return this.toShowtimeDate().toLocaleString();
  },

  upvoteMovie: function () {
    var newRating;

    newRating = this.get('rating') + 1;

    this.save({ 'rating': newRating });
  }
});
module.exports = Movie;

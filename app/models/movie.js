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

  toShowtimeDate: function () {
    var d = new Date();
    d.setUTCSeconds(this.get('showtime'));
    return d;
  },

  showtimeToString: function () {
    return this.toShowtimeDate().toLocaleString();
  }
});
module.exports = Movie;

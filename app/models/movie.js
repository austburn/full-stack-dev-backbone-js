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

  voteMovie: function (rating) {
    var _update;

    _update = function () {
      this.set({
        rating: rating
      });
    };

    this.save({
      type: 'PUT',
      url: '/movies' + this.id,
      contentType: 'application/json',
      data: JSON.stringify({ vote: rating })
    })
    .then(_update)
    .fail(function (err) { console.log(err); });
  }
});
module.exports = Movie;

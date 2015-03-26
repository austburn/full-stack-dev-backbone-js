var chai = require('chai');
var Movie = require('../../app/models/movie');

describe('models.movie', function() {
  var movie;

  beforeEach(function () {
    movie = new Movie();
  });

  it('has a default rating', function () {
    chai.assert.equal(movie.get('rating'), 0);
  });
});
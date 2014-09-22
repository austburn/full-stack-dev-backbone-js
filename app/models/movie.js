var Backbone, Movie;

Backbone = require('backbone');

Movie = Backbone.Model.extend({
  defaults: {
    title: 'default',
    year: 0,
    description: 'empty',
    selected: false
  }
});
module.exports = Movie;

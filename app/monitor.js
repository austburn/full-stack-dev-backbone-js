var _, Backbone, Monitor;

_ = require('underscore');
Backbone = require('backbone');

Monitor = function (collection) {
  _.extend(this, Backbone.Events);
  this.listenTo(collection, 'all', function (eventName) {
    console.log(eventName);
  });
};

module.exports = Monitor;
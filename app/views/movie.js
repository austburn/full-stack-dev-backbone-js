var $, Backbone, MovieView, _;

$ = require('jquery');
Backbone = require('backbone');
_ = require('underscore');

MovieView = Backbone.View.extend({
  tagName: 'article',
  className: 'movie',
  template: '<h1><%= title %><hr></h1>',
  render: function () {
    var tmpl;
    tmpl = _.template(this.template);
    this.$el.html(tmpl(this.model.toJSON()));
    this.$el.toggleClass('selected', this.model.get('selected'));
    return this;
  },
  initialize: function () {
    this.listenTo(this.model, 'change:selected', this.render);
  },
  events: {
    'click': '_selectMovie'
  },
  _selectMovie: function (e) {
    e.preventDefault();
    if (!this.model.get('selected')) {
      this.model.collection.resetSelected();
      this.model.collection.selectByID(this.model.id);
    }
  }
});
module.exports = MovieView;
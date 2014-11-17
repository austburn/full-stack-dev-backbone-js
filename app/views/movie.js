var $, Backbone, MovieView, _;

$ = require('jquery');
Backbone = require('backbone');
_ = require('underscore');

MovieView = Backbone.View.extend({
  tagName: 'article',
  className: 'movie',
  template: '<h5><%= title %></h5><hr><a href="#" class="vote">+1</a>',

  render: function () {
    var tmpl;
    tmpl = _.template(this.template);
    this.$el.html(tmpl(this.model.toJSON()));
    this.$el.toggleClass('selected', this.model.get('selected'));
    return this;
  },

  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.model, 'change:selected', this.render);
  },
  events: {
    'click': '_selectMovie',
    'click .vote': '_upvote'
  },

  _selectMovie: function (e) {
    e.preventDefault();
    if (!this.model.get('selected')) {
      this.model.collection.resetSelected();
      this.model.collection.selectByID(this.model.id);
      this.router.navigate('/details/' + this.model.id, { trigger: true });
    }
  },

  _upvote: function (e) {
    e.preventDefault();
    this.model.upvoteMovie();
  }
});
module.exports = MovieView;
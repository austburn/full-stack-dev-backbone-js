var Backbone, _, DetailsView;

Backbone = require('backbone');
_ = require('underscore');

DetailsView = Backbone.View.extend({
  el: '#details',
  template: _.template('<%= showtime %> <br />Rating: <%= rating %> <br /> <%= description %>'),
  render: function () {
    this.$el.html(this.template({
      showtime: new Date(this.model.get('showtime')).toLocaleDateString(),
      rating: this.model.get('rating'),
      description: this.model.get('description')
    }));
    return this;
  },

  initialize: function () {
    this.model.on('change:rating', function () {
      this.render();
    }, this);
  }
});
module.exports = DetailsView;
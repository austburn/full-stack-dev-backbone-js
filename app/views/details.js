var Backbone, _, DetailsView;

Backbone = require('backbone');
_ = require('underscore');

DetailsView = Backbone.View.extend({
  el: '#details',
  template: _.template('<%= showtime %> <br /> <%= description %>'),
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
module.exports = DetailsView;
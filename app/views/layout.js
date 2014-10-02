var Backbone, _, MoviesList, Layout, DetailsView, ChoseView, instance;

Backbone = require('backbone');
_ = require('underscore');
MoviesList = require('views/moviesList');
DetailsView = require('views/details');
ChoseView = require('views/chose');
ControlsView = require('views/controls');

Layout = Backbone.View.extend({
  template: _.template(
    '<header>' +
      '<a href="#">Home</a>' +
      '<nav id="controls">' +
        '<button id="sort-by-title">Sort By Title</button>' +
        '<button id="sort-by-rating">Sort By Rating</button>' +
        '<button id="sort-by-showtime">Sort By Showtime</button>' +
        '<select name="genre">' +
          '<option value="all">All</option>' +
          '<option value="Drama">Drama</option>' +
          '<option value="Action">Action</option>' +
        '</select>' +
      '</nav>' +
    '</header>' +
    '<div id="overview"></div><div id="details"></div>'
  ),

  render: function () {
    this.$el.html(this.template());
    this.currentDetails.setElement(this.$('#details')).render();
    this.overview.setElement(this.$('#overview')).render();
    this.controls.setElement(this.$('#controls')).render();

    return this;
  },

  initialize: function (options) {
    this.overview = new MoviesList({
      collection: options.router.movies,
      router: options.router
    });
    this.currentDetails = new ChoseView();
    this.controls = new ControlsView({
      collection: options.router.movies,
      superset: new Backbone.Collection(options.router.movies.models)
    });
  },

  setDetails: function (movie) {
    this._disposeDetails();
    this.currentDetails = new DetailsView({ model: movie });
    this.render();
  },

  setChose: function () {
    this._disposeDetails();
    this.currentDetails = new ChoseView();
    this.render();
  },

  _disposeDetails: function () {
    if (this.currentDetails) {
      this.currentDetails.remove();
    }
  }
});

Layout.getInstance = function (options) {
  if (!instance) {
    instance = new Layout({
      el: options.el,
      router: options.router,
      collection: options.router.movies
    });
  }
  return instance;
}
module.exports = Layout;
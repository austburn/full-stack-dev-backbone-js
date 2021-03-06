var Backbone, _, MoviesList, Layout, DetailsView, ChooseView, ControlsView, instance;

Backbone = require('backbone');
Backbone.Obscura = require('backbone.obscura');
_ = require('underscore');
MoviesList = require('views/moviesList');
DetailsView = require('views/details');
ChooseView = require('views/choose');
ControlsView = require('views/controls');

Layout = Backbone.View.extend({
  className: 'container',

  render: function () {
    this.currentDetails.setElement(this.$('#details')).render();
    this.moviesList.setElement(this.$('#movies')).render();
    this.controls.setElement(this.$('#controls')).render();

    return this;
  },

  initialize: function (options) {
    this.proxy = new Backbone.Obscura(options.router.movies);
    this.moviesList = new MoviesList({
      collection: this.proxy,
      router: options.router
    });
    this.currentDetails = new ChooseView();
    this.controls = new ControlsView({
      el: '#controls',
      collection: this.proxy
    });
  },

  setDetails: function (movie) {
    this._disposeDetails();
    this.currentDetails = new DetailsView({ model: movie });
    this.render();
  },

  setChose: function () {
    this._disposeDetails();
    this.currentDetails = new ChooseView();
    this.render();
  },

  _disposeDetails: function () {
    if (this.currentDetails) {
      this.currentDetails.undelegateEvents();
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
};
module.exports = Layout;
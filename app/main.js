var Backbone, $, MoviesRouter;

Backbone = require('backbone');
$ = require('jquery');
Backbone.$ = $;
MoviesRouter = require('routers/movies');

$(document).ready(function () {
  console.log('initialize app');
  this.router = new MoviesRouter({ el: $('#movies') });
  Backbone.history.start({
    pushState: true,
    root: '/'
  });
});
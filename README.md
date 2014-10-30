# Full Stack Web Development with Backbone.js
Put up this repo to keep track of and post my progress along with what I am learning.
This is a simple Backbone project to get comfortable with Backbone again. I once used it prior to v1 and have decided to revisit it via this book with hopes of learning more about what it means to be a full stack developer.
There isn't much here yet, but I plan to update this chapter-ly.
Currently, this pretty much only uses ExpressJS and browserify. To run:
```
# Get all the packages you'll need
npm install
# Use gulp to start
gulp
```
### About Gulp
Gulp uses a couple tools to set up a development server. I use ```watchify``` (which is based on ```browserify```)
to monitor changes to the codebase and rebundle as needed. This prevents your from having to rebuild Javascript everytime you change something. I also use ```pushstate-server``` to use the HTML5 History API.

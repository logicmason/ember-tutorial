App = Ember.Application.create();

App.Router.map(function() {
	this.resource('about');
	this.resource('posts');
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

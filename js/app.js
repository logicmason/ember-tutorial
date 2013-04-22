App = Ember.Application.create();

App.Store = DS.Store.extend({
	revision: 12,
	adapter: 'DS.FixtureAdapter'
});

App.Router.map(function() {
	this.resource('about');
	this.resource('posts', function() {
		this.resource('post', { path: ':post_id'});
	});
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return App.Post.find();
	}
});

App.Post = DS.Model.extend({
	title: DS.attr('string'),
	author: DS.attr('string'),
	intro: DS.attr('string'),
	extended: DS.attr('string'),
	publishedAt: DS.attr('date')
});

App.Post.FIXTURES = [{
	id: 1,
	title: "Use hacks",
	author: "cheeseen",
	publishedAt: new Date('3-26-2013'),
	intro: "Sheeeeiiiit!",
	extended: "You just sit down and keep typing stuff until it works!  Use hacks!"
}, {
	id: 2,
	title: "All N of my queens",
	author: "ruanp",
	publishedAt: new Date('4-03-2013'),
	intro: "What would you say if I said I could cut the search space and make it run 17 million times faster?",
	extended: "Would you be impressed?  And... what if I told you I could improve the speed by a factor of 1.4 quintillion?  Would you find that impressive?"
}];


App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

Ember.Handlebars.registerBoundHelper('date', function(date) {
	return moment(date).fromNow();
});

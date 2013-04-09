Template.nav.loggedIn = function() {
	return Meteor.userId();
};

Template.nav.events({
	'click input.btnMyPage':function(){
		Meteor.Router.to('/' + Meteor.user().username);
	},
		'click input.btnHome':function(){
		Meteor.Router.to('/home');
	},
	'click a.brand': function(){
		Meteor.Router.to('/home');
	}
});
Template.nav.loggedIn = function() {
	return Meteor.userId();
};

Template.nav.events({
	'click input.btnMyPage':function(){
		Session.set("currentPage", Meteor.userId());
	},
		'click input.btnHome':function(){
		Session.set("currentPage", 0);
	}
});
Meteor.subscribe("directory");
Meteor.subscribe("quotes");


Session.setDefault("currentPage", 0);

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});


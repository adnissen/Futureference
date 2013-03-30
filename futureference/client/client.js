Meteor.subscribe("directory");
Meteor.subscribe("quotes");

Session.setDefault("currentPage", 0);
Session.setDefault("requests", 0);
Session.setDefault("favs", 0);
Session.setDefault("pageUsername", 0);
Session.setDefault("isFriend", 0);
Session.setDefault("fSent", 0);

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});
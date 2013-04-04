directorySubscription = Meteor.subscribe("directory");
quotesSubscription = Meteor.subscribe("quotes")

Session.setDefault("currentPage", 0);
Session.setDefault("requests", 0);
Session.setDefault("favs", 0);
Session.setDefault("pageUsername", 0);
Session.setDefault("isFriend", 0);
Session.setDefault("fSent", 0);
Session.setDefault("friendArray", []);

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.Router.add({
	'/:username': function(username){
		Meteor.call("getIdFromUsername", username, function(err, data){
			Session.set("currentPage", data);
		});
	},
	'/home': function(){
		Session.set("currentPage", 0);
	},
	'/api': function(){
		Session.set("currentPage", "api");
	}
});
Meteor.subscribe("directory");
Meteor.subscribe("quotes");

Template.main.greeting = function () {
 return "Welcome to futureference.";
};

Template.userPage.userName = function() {
 return "User Name";
};

Template.main.userQuotes = function() { 
 return Quotes.find({owner: Meteor.userId()});
};

Template.userPage.user = function() {
	return Quotes.find({owner: 5344});
}

Template.main.events({});
Template.home.greeting = function () {
 	
 	return "Welcome to futureference.";
};

Template.home.userQuotes = function() {
 	return Quotes.find({owner: Meteor.userId()});
};

Template.home.loggedIn = function() {
	return Meteor.userId();
};

Template.home.quote = function() { 
	//this is the main page, so it just shows the quotes 
	//of the logged in user
 	return Quotes.find({owner: Meteor.userId()});
};
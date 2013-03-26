Template.home.greeting = function () {
 	return "Welcome to futureference.";
};

Template.home.userQuotes = function() {
 	return Quotes.find({owner: Meteor.userId()});
};

Template.home.loggedIn = function() {
	return Meteor.userId();
};

Template.home.quotes = function() { 
	//this is the main page, so it just shows the quotes 
	//of the logged in user
	var homeuser = Meteor.users.findOne({_id: Meteor.userId()});
	if (homeuser && homeuser.favsList)
 		return homeuser.favsList;
 	else
 		return [];
};
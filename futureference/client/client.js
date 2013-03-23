Meteor.subscribe("directory");
Meteor.subscribe("quotes");

Template.main.greeting = function () {
 return "Welcome to futureference.";
};

Template.main.userQuotes = function() {
 
 return Quotes.find({owner: Meteor.userID()});
};

Template.main.events({});
Meteor.publish("directory", function() {
	return Meteor.users.find({});
});

Meteor.publish("quotes", function() {
	//right now it only returns "public" quotes
	//it should eventually search through a friendslist and return those
	return Quotes.find({});
});

Meteor.startup(function() {
	//just add a quote if the db is empty for testing purposes
	if (Quotes.find().count() == 0)
			Quotes.insert({quote: "hi, test", owner: 343, likes: 1 });
});
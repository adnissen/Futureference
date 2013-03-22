Meteor.publish("directory", function() {
	return Meteor.users.find({});
});

Meteor.publish("quotes", function() {
	//right now it only returns "public" quotes
	//it should eventually search through a friendslist and return those
	return Quotes.find({"public": true});
});

Meteor.startup(function() {
	//just add a quote if the db is empty for testing purposes
	if (Quotes.find().count() == 0)
		Quotes.insert({public: false, quote: "hi, buddy"});
});
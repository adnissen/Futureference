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
	if (Quotes.find().count() == 0){
			Quotes.insert({quote: "hi, test", owner: 432, likes: 1 });
			Quotes.insert({quote: "clementine club", owner: 343, likes: 14 });
			Quotes.insert({quote: "whaddup", owner: 6533, likes: 11 });
			Quotes.insert({quote: "Do you like chinese food? I dont", owner: 5344, likes: 1 });
			Quotes.insert({quote: "No Cops No Stops", owner: 543, likes: 0 });
		}

});	
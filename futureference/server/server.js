var mongo_url = process.env.MONGOHQ_URL;

Meteor.publish("directory", function() {
	return Meteor.users.find({$or: [{friendsList: this.userId}, {_id: this.userId}]});
});

Meteor.publish("quotes", function() {
	//right now it only returns "public" quotes
	//it should eventually search through a friendslist and return those
	var friends = Meteor.users.find({$or: [{friendsList: this.userId}, {_id: this.userId}]}).fetch();
	console.log(friends);
	var friendArray = friends;
	for (var i = 0; i < friends.length; i++) {
		friendArray[i] = friends[i]._id;
	};
	console.log(friendArray);
	console.log(Quotes.find({owner: friendArray}));
	return Quotes.find({owner: {$in: friendArray}});
});

Meteor.Router.add('/:username.json', 'GET', function(_username){
	var obj = {"quotes": []};
	var quotes = Quotes.find({username: _username}, {});
	var count = 0;
	quotes.forEach(function(post){
		obj.quotes[count] = post.quote;
		count++;
	});
	return JSON.stringify(obj);
});

Meteor.startup(function() {
	//just add a quote if the db is empty for testing purposes
	if (Quotes.find().count() == 0){
			Quotes.insert({quote: "hi, test", owner: 432, likes: 1 });
			Quotes.insert({quote: "clementine club", owner: 343, likes: 14 });
			Quotes.insert({quote: "whaddup", owner: 6533, likes: 11 });
			Quotes.insert({quote: "Do you like chinese food? I dont", owner: 5344, likes: 1 });
			Quotes.insert({quote: "I'm not me if I'm not high.", owner: 5344, likes: 1 });
			Quotes.insert({quote: "No Cops No Stops", owner: 543, likes: 0 });
		}
});	
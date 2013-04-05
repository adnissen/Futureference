mongo_url = process.env.MONGOHQ_URL;

Meteor.publish("directory", function() {
	return Meteor.users.find({$or: [{friendsList: this.userId}, {_id: this.userId}]}, {fields: {apiKey: 0}});
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

//get a users quotes
Meteor.Router.add('/:username.json', 'GET', function(_username){
	var paramUser = this.request.query.loginName;
	var paramApiKey = this.request.query.apiKey;
	var user = Meteor.users.findOne({username: paramUser});
	console.log(this.request);
	console.log(paramApiKey);
	console.log(user.apiKey);
	if (user && user.apiKey && user.apiKey == paramApiKey)
	{
		console.log('true');
		var friendid = Meteor.call("getIdFromUsername", _username);
		var friends = Meteor.call("checkFriend", user._id, friendid);
		if (friends)
		{
			var obj = {"object": []};
			var quotes = Quotes.find({username: _username}, {});
			var count = 0;
			quotes.forEach(function(post){
				var quoteObj = {
					owner: post.username,
					id: post._id,
					quote: post.quote,
					likes: post.totalLiked,
					timestamp: post.timestamp
				};
				obj.object.push(quoteObj);
				count++;
			});
			return JSON.stringify(obj) + "\n";
		}
	}
	return "Access Denied!\n";
});

//add a quote to a user
Meteor.Router.add('/:username.json', 'POST', function(_username){
	var paramUser = this.request.body.loginName;
	var paramApiKey = this.request.body.apiKey;
	var newQuote = this.request.body.quote;
	var user = Meteor.users.findOne({username: paramUser});
	var userTarget = Meteor.users.findOne({username: _username});
	if (user && user.apiKey && user.apiKey == paramApiKey && user != userTarget)
	{
		var friendid = Meteor.call("getIdFromUsername", _username);
		var friends = Meteor.call("checkFriend", user._id, friendid);
		if (friends)
		{
			var _id = Meteor.call("addQuote", friendid, newQuote);
			console.log(_id);
			var obj = {
				id: _id,
				owner: userTarget.username,
				quote: newQuote
			};
			return JSON.stringify(obj) + "\n";
		}
	}
	return "Access Denied!\n";
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
Template.home.greeting = function () {
 	return "Welcome to futureference.";
};

Template.home.userQuotes = function() {
 	return Quotes.find({owner: Meteor.userId()});
};

Template.home.loggedIn = function() {
	return Meteor.userId();
};

Template.home.request = function(){
	var list = new Array();
	var emails = new Array();
	if (Meteor.userId())
	{
		var user = Meteor.user();
		if (user && user.fReceived && user.fReceived.length > 0)
		{
			for (var i = 0; i < user.fReceived.length; i++) {
				list[i] = user.fReceived[i];
				Meteor.call("getEmailFromId", list[i], function(err, data){
					emails.push(data);
					Session.set("requests", emails);
				});
			}
			//Session.set("requests", list);
		}
	}
	if (Session.get("requests"))
		return Session.get("requests");
	else
		return ["No Friend Requests"];
};

Template.home.events({
	'click input.btnAcceptFriend':function(){
		//call addfriend
		console.log(this.toString());
		Meteor.call("getIdFromEmail", this.toString(), function(err, data){
			console.log(data);
			Meteor.call("addFriend", Meteor.userId(), data);
		});
	}
});

Template.home.requests = function() {
	var user = Meteor.user();
	if (user && user.fReceived)
		return user.fReceived.length;
	else
		return false;
}

Template.home.quotes = function() { 
	//I think this should probably go in the Template.home.created area, so it only runs once
	//after all, we are just storing the favorites in a session variable
	var list = 0;
	if (Meteor.userId())
	{
		Meteor.call("convertFavesToQuotes", Meteor.userId, function(err, data){
			if (data)
			{
				list = data;
				Session.set("favs", list);
			}
		});
	}

	//so the first time the code gets here the above call will not have returned
	//that's because the server is obviously slower than the client
	//however, Meteor keeps track of all Session variables
	//so when one changes, it finds all the instances of it and updates those elements


	//therefore, Session.get("favs") is going to return null the first time through
	//however, when the above finally finishes and sets "favs" to something, it'll look at this if again
	if (Session.get("favs"))
	{
 		return Session.get("favs");
 	}
 	else
 		return ["No Favorites To Display"];
};
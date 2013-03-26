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
	var list = 0;
	Meteor.call("convertFavesToQuotes", Meteor.userId, function(err, data){
		if (data)
		{
			list = data;
			Session.set("favs", list);
		}
	});
	if (Session.get("favs"))
	{
 		return Session.get("favs");
 	}
 	else
 		return ["Loading Favorites..."];
};
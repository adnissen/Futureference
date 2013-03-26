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
 	Meteor.call("convertFavesToQuotes", Meteor.userId(), function(err, data){
 		if (err)
 			console.log(err);
 		if (data)
 		{
	 		console.log(data.list);
	 		for (var i = 0; i < data.list.length; i++) {
	 			console.log(data.list[i].quote);
	 		};
	 		console.log(data);
	 		return data;
 		}
 	});
};
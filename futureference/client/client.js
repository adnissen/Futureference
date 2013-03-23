Meteor.subscribe("directory");
Meteor.subscribe("quotes");

Template.main.greeting = function () {
 	return "Welcome to futureference.";
};

Template.main.userQuotes = function() {
 	return Quotes.find({owner: Meteor.userId()});
};

Template.userPage.userName = function() {
	return "Catherine Kate";
	//eventually return the Session variable that has the page stored
};

Template.quote.selectedQuote = function() {
	if (Meteor.userId() != null)
	{
		if (Session.get("selectedQuote") == this._id)
			return true;
		else
			return false;
	}
	else
		return false;	
};

Template.quote.isOwner = function() {
	return Meteor.userId() == this.owner;
};

Template.main.quote = function() { 
 	return Quotes.find({owner: Meteor.userId()});
};

Template.userPage.user = function() {
	return Quotes.find({owner: 'cQcDo9thY8FswaDMt'});
}

Template.main.events({});

Template.quote.events({
	'click' : function() {
		if (Session.get("selectedQuote") == this._id)
			Session.set("selectedQuote", null);
		else
			Session.set("selectedQuote", this._id);
	},
	'click input.btnDelete': function(){
		Meteor.call("deleteQuote", Meteor.userId(), this._id);
	}
});

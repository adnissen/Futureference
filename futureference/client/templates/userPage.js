Template.userPage.userName = function() {
	var username = Meteor.users.findOne({_id: Session.get("currentPage")}).username;
	return username;
	//eventually return the Session variable that has the page stored
};

Template.userPage.user = function() {
	//this is hardcoded to my test account right now
	//eventually it should be tied to a Session variable like
	//Session.get("currentPage", userId);
	return Quotes.find({owner: Session.get("currentPage")});
};

//for the addquote enter key button
Template.userPage.events(okCancelEvents('#txtAddQuote',{
	ok: function(text, evt){
		Meteor.call("addQuote", Session.get("currentPage"), text);
		evt.target.value = "";
	}
}));
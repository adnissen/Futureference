Template.userPage.userName = function() {
	Meteor.call("getUsername", Session.get("currentPage"),function(error, data){
		Session.set("pageUsername", data);
	});
	return Session.get("pageUsername");
	//eventually return the Session variable that has the page stored
};

Template.userPage.loggedIn = function() {
	return Meteor.userId();
};

Template.userPage.isOwner = function(){
	return (Meteor.userId() == Session.get("currentPage"))
};

Template.userPage.sent = function(){
	if (Meteor.user())
	{
		var sentList = Meteor.user().fSent;
		if (sentList)
		{
			for (var i = 0; i < sentList.length; i++) {
				if (sentList[i] == Session.get("currentPage"))
					Session.set("fSent", true);
			};
		}
		var receivedList = Meteor.user().fReceived;
		if (receivedList)
		{
			for (var i = 0; i < receivedList.length; i++) {
				if (receivedList[i] == Session.get("currentPage"))
					Session.set("fSent", true);
			};
		}
	}
	return Session.get("fSent");
};

Template.userPage.friends = function(){
	Meteor.call("checkFriend", Meteor.userId(), Session.get("currentPage"), function(err, data){
		Session.set("isFriend", data);
	});
	return Session.get("isFriend");
};

Template.userPage.user = function() {
	//this is hardcoded to my test account right now
	//eventually it should be tied to a Session variable like
	//Session.get("currentPage", userId);
	return Quotes.find({owner: Session.get("currentPage")}, {sort: {timestamp: -1}});
};

//for the addquote enter key button
Template.userPage.events(okCancelEvents('#txtAddQuote',{
	ok: function(text, evt){
		Meteor.call("addQuote", Session.get("currentPage"), text);
		evt.target.value = "";
	}
}));

Template.userPage.events({
	'click input.btnAddFriend': function(){
	Meteor.call("sendFRequest", Meteor.userId(), Session.get("currentPage"), function(err, data){
		Session.set("fSent", true);
	});
	}
})
Template.userSearch.events(okCancelEvents('#txtFriendSearch', {
	ok: function(text, evt){
		//this needs to only work if the email is on their friends list
		//but it can wait I suppose
		/*Meteor.call("checkFriend", Meteor.userId(), text, function(err, data){
			if (err)
			{
				console.log(err);
				evt.target.value = "";
			}
			else
			{
				if (data.friendId == null)
					console.log("not friends")
				else
					Session.set("currentPage", data.friendId);
				evt.target.value = "";
			}
		});*/
		Meteor.call("userSearch", text, function(error, data){
			console.log(data);
			if (data)
				Session.set("currentPage", data);
		});
		directorySubscription.stop();
		directorySubscription = Meteor.subscribe("directory");
		quotesSubscription.stop();
		quotesSubscription = Meteor.subscribe("quotes")
		Session.set("currentPage", 0);
	}
}));

Template.userSearch.friendData = function(){
	if (Meteor.user() && Meteor.user().friendsList)
	{
		var ary = new Array();
		for (var i = 0; i < Meteor.user().friendsList.length; i++) {
			Meteor.call("getUsername", Meteor.user().friendsList[i], function(err, data){
				ary.push(data);
				var friendArray = '"' + ary.join('","') + '"';
				Session.set("friendArray", friendArray);
			})
		};
	}
	return Session.get("friendArray");
};

Template.userSearch.rendered = function() {

	$('.txtFriendSearch').typeahead();

};
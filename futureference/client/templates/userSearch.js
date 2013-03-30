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
		subscription.stop();
		subscription = Meteor.subscribe("quotes")
		Session.set("currentPage", 0);
	}
}));
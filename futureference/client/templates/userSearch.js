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
		Session.set("currentPage", Meteor.users.findOne({emails: {$elemMatch: {address: text}}})._id);
	}
}));
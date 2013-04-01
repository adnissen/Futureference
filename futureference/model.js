Quotes = new Meteor.Collection("quotes");
Quotes.allow({
	insert: function(userId, quote) {
		return false; //use createQuote instead
	},
	update: function(userId, quote) {
		return false; //no editing quotes, that would ruin the fun
	},
	remove: function(userId, quote) {
		return quote.owner == userId; //you can only remove quotes that you "own"
	}
});

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

if (Meteor.isServer) {
	Meteor.methods({
		/* put all your sweet new methods here
		 * it's trusted code, so you can do pretty much anything
		 */
		 //user related methods
		 addToFavs:function(quote)
		 {
		 	if (Meteor.userId() != quote.owner)
		 	{
		 	var _userId = Meteor.userId();
		 	var _quoteId = quote._id;
			 var newTotal = quote.totalLiked;
			 console.log(quote.totalLiked);
			 newTotal++;
			 Quotes.update({_id: _quoteId}, {$set: {totalLiked: newTotal}});

			 Meteor.users.update({_id: _userId}, {$push: {favsList: _quoteId}})
		 	}
		 	else
		 		return "access denied";
		 },
		removeFavs:function(quote)
		 {
		 	var _userId = Meteor.userId();
		 	var _quoteId = quote._id;
			 var newTotal = quote.totalLiked;
			 console.log(quote.totalLiked);
			 newTotal--;
			 Quotes.update({_id: _quoteId}, {$set: {totalLiked: newTotal}});

			 Meteor.users.update({_id: _userId}, {$pull: {favsList: _quoteId}})
		 	
		 },

		 //quote related methods
		 addQuote:function(_userId, _quote)
		 {
		 	// they can't add quotes to itself
		 	if (_userId != Meteor.userId())
		 	{
		 		var time = new Date().getTime();
		 		Meteor.call("getUsername", _userId, function(err, data){
		 			Quotes.insert({quote: _quote, username: data, owner: _userId, totalLiked: 0, timestamp: time});
		 		});
		 	}
		 	else
		 		return "access denied";
		 },
		 deleteQuote:function(_userId, _quote){
		 	if (_userId == Meteor.userId()){ // only remove own quotes
		 		Quotes.remove({_id: _quote});
		 		}
		 	else
		 		return "access denied";
		 },	
		 sendFRequest: function(_senderId, _receivingId){
		 	//add it to the sent list
		 	Meteor.users.update({_id: _senderId}, {$push: {fSent: _receivingId}});

		 	//add it to the received list
		 	Meteor.users.update({_id: _receivingId}, {$push: {fReceived: _senderId}});

		 	//return true to update the page
		 	return true;
		 },
		 ignoreFrequest: function(_userId, _ignoreId){
		 	if (Meteor.userId() == _userId)
		 	{
			 	//remove the id from the received and waiting for response list
			 	Meteor.users.update({_id: _userId}, {$pull: {fReceived: _ignoreId}});
			 	//then add it to the ignored list
			 	Meteor.users.update({_id: _userId}, {$push: {fIgnored: _ignoreId}});

			 	//this is all we have to do here. It'll still show up as "sent" for the person who sent it
			 	//but it won't bother the person who ignored it
		 	}
		 	else
		 		return "access denied";
		 },
		 addFriend:function(_userId, _newFriendId){
		 	if (Meteor.userId() == _userId)
		 	{
		 		//makes sure that the friend request the user is accepting has been sent by who they say it has
		 		var sentList =  Meteor.users.findOne({_id: _newFriendId});
		 		var found = false;
		 		if (sentList && sentList.fSent)
		 		{
		 			for (var i = 0; i < sentList.fSent.length; i++) {
		 				if (sentList.fSent[i] == _userId)
		 					found = true;
		 			};
		 		}
		 		if (found)
		 		{
				 	//add it to the first one
					Meteor.users.update({_id: _userId}, {$push: {friendsList: _newFriendId}});

					//now add it to the other
					Meteor.users.update({_id: _newFriendId}, {$push: {friendsList: _userId}});

					//remove it from everything
					Meteor.users.update({_id: _userId}, {$pull: {fReceived: _newFriendId}});
					Meteor.users.update({_id: _newFriendId}, {$pull: {fSent: _userId}});

					//return true so that isFriend can update the page
					return true;
				}
			}
			return "access denied";
		 },
		 topQuotes:function(){
		 	var topQuotes = Quotes.find({}, {sort: {score: 1}, limit: 5});
		 	console.log(topQuotes);
		 	return topQuotes; 
		 },
		 getIdFromEmail:function(email){
		 	var obj = Meteor.users.findOne({emails: {$elemMatch: {address: email}}});
		 	console.log(obj._id);
		 	if (obj != null)
		 		return obj._id;
		 	else
		 		return null;
		 },
		 getEmailFromId:function(id){
		 	var obj = Meteor.users.findOne({_id: id});
		 	if (obj)
		 		return obj.emails[0].address;
		 	else
		 		return null;
		 },
		 getUsername:function(id){
		 	var user = Meteor.users.findOne({_id: id});
		 	if (user)
		 		return user.username;
		 	else
		 		return "no user";
		 },
		 checkFriend:function(_userId, _friendId){
		 	if (_userId == _friendId)
		 		return true;
		 	var user = Meteor.users.findOne({_id: _userId});
		 	if (user.friendsList)
		 	{
			 	var friendsList = user.friendsList;
			 	for (var i = 0; i < friendsList.length; i++) {
			 		if (friendsList[i] == _friendId)
			 		{
			 			return true;
			 		}
			 	}
		 	}
		 	return false;
		 },
		 userSearch:function(_email)
		 {
		 	var user = Meteor.users.findOne({emails: {$elemMatch: {address: _email}}});
		 	if (user)
		 		return user._id;
		 	else
		 		{
		 			user = Meteor.users.findOne({username: _email});
		 			if (user)
		 				return user._id;
		 			else
		 				return false;
		 		}
		 },
		 convertFavesToQuotes:function(_userId)
		 {
		 	var idList = Meteor.users.findOne({_id: Meteor.userId()}).favsList;
		 	var quoteList = idList;
		 	var _quote;
		 	var result = {};
		 	if (idList)
		 	{
		 		if (idList.length > 0)
		 		{
		 			for (var i = idList.length - 1; i >= 0; i--) {
		 				if (Quotes.findOne({_id:idList[i]}))
		 				{
		 					_quote = Quotes.findOne({_id:idList[i]});
		 					quoteList[i] = {quote: _quote.quote};
		 					Meteor.call("getUsername", _quote.owner, function(err, data){
		 						quoteList[i].owner = data;
		 					});
		 				}
		 				else
		 					quoteList.remove(i);
		 			}
		 			result.list = quoteList;
		 			return quoteList;
		 		}
		 	}
		 	return ['No Favorites to Display'];
		 }
		
	});
}
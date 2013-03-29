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
		 	var _userId = Meteor.userId();
		 	var _quoteId = quote._id;
			 var newTotal = quote.totalLiked;
			 console.log(quote.totalLiked);
			 newTotal++;
			 Quotes.update({_id: _quoteId}, {$set: {totalLiked: newTotal}});

			 Meteor.users.update({_id: _userId}, {$push: {favsList: _quoteId}})
		 	
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
		 		Quotes.insert({quote: _quote, owner: _userId, totalLiked: 0});
		 },
		 deleteQuote:function(_userId, _quote){
		 	if (_userId == Meteor.userId()){ // only remove own quotes
		 		Quotes.remove({_id: _quote});
		 		}
		 	},	
		 addFriend:function(_userId, friendEmail){
		 	var friendId = Meteor.users.findOne({emails: {$elemMatch: {address: friendEmail}}})._id;

			Meteor.users.update({_id: _userId}, {$push: {friendsList: friendId}});

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
		 getUsername:function(id){
		 	var user = Meteor.users.findOne({_id: id});
		 	if (user)
		 		return user.username;
		 	else
		 		return "no user";
		 },
		 checkFriend:function(_userId, _friendEmail){
		 	var _friendId = Meteor.call("getIdFromEmail", _friendEmail);
		 	console.log("friend id: " + _friendId);
		 	var friend1 = Meteor.users.findOne({$and: [{_id: _friendId},{friendsList: _userId}]});
		 	console.log(friend1);
		 	var friend2 = Meteor.users.findOne({$and: [{_id: _userId},{friendsList: _friendId}]});
		 	console.log(friend2);

		 	var result = {};
		 	if (friend1 != null && friend2 != null)
		 	{
		 		console.log("are friends");
		 		result.friendId = friend2._id;
		 		return result;
		 	}
		 	else
		 	{
		 		console.log("are not friends");
		 		result.friendId = friend2._id;
		 		return result;
		 	}

		 },
		 userSearch:function(_email)
		 {
		 	var user = Meteor.users.findOne({emails: {$elemMatch: {address: _email}}});
		 	if (user)
		 		return user._id;
		 	else
		 		return 0;
		 },
		 convertFavesToQuotes:function(_userId)
		 {
		 	var idList = Meteor.users.findOne({_id: Meteor.userId()}).favsList;
		 	var quoteList = idList;
		 	var result = {};
		 	if (idList)
		 	{
		 		if (idList.length > 0)
		 		{
		 			for (var i = idList.length - 1; i >= 0; i--) {
		 				if (Quotes.findOne({_id:idList[i]}))
		 					quoteList[i] = Quotes.findOne({_id:idList[i]}).quote;
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
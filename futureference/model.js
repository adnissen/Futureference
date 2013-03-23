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

if (Meteor.isServer) {
	Meteor.methods({
		/* put all your sweet new methods here
		 * it's trusted code, so you can do pretty much anything
		 */
		 //user related methods
		 addToLikeCount:function(_userId)
		 {
		 	var userId = Meteor.userId();
		 	if (userId == _userId)
		 	{
			 	var user = Meteor.users.findOne({_id: userId});
			 	var newTotal = user.totalLiked;
			 	newTotal++;
			 	Meteor.users.update({_id: userId}, {$set: {totalLiked: newTotal}});
		 	}
		 },

		 //quote related methods
		 addQuote:function(_userId, _quote)
		 {
		 	// they can't add quotes to itself
		 	if (_userId != Meteor.userId())
		 		Quotes.insert({quote: _quote, owner: _userId, likes: 0});
		 },
		 deleteQuote:function(_userId, _quote){
		 	if (_userId == Meter.userId()){ // only remove own quotes
		 		Quotes.remove({_id: _quote._id});
		 		}
		 	},	
		 addFriend:function(_userId, friendEmail){
		 	var friendId = Meteor.users.findOne({emails: {$elemMatch: {address: friendEmail}}})._id;

			Meteor.users.update({_id: _userId}, {$push: {friendsList: friendId}});

		 }
		
	});
}
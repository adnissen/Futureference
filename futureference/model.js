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
		 viewLikeCount:function(_userId, _quote){
		 	return Quotes.findOne({_id: _quote}).likes;
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
		 	return topQuotes; 
				
		 }
		
	});
}
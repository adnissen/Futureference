Template.quote.total = function(){
	console.log(this.totalLiked);
	return ("Likes: "  + this.totalLiked.toString());
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
	//we return if they're the owner, so they can delete the quotes
	return Meteor.userId() == this.owner;
};
Template.quote.isFaved = function() {
    //we return if they're the owner, so they can delete the quotes
    var favArray = Meteor.users.findOne({_id: Meteor.userId()}).favsList;
	 if (favArray != null){
	    if (favArray.length > 0 ){
	        for (var i = 0; i < favArray.length; i++){
	            if (favArray[i] == this._id){
	                return true;
	            }
	        }
	    }
	}
    return false;
};

Template.quote.rendered = function() {
	$('.quotes').tooltip();
};

Template.quote.events({
	'click' : function() {
		if (Session.get("selectedQuote") == this._id)
			Session.set("selectedQuote", null);
		else
			Session.set("selectedQuote", this._id);
	},
	'click input.btnDelete': function(){
		Meteor.call("deleteQuote", Meteor.userId(), this._id);
	},
	'click input.btnFavorite': function(){
		
		Meteor.call("addToFavs", this);

	},
	'click input.btnUnFav': function(){
		
		Meteor.call("removeFavs", this);

	}
});
Meteor.subscribe("directory");
Meteor.subscribe("quotes");


Session.setDefault("currentPage", 'cQcDo9thY8FswaDMt');
//THIS CODE WAS TAKEN FROM THE 'TODOS' EXAMPLE
//*******************************
// Returns an event map that handles the "escape" and "return" keys and
// "blur" events on a text input (given by selector) and interprets them
// as "ok" or "cancel".
var okCancelEvents = function (selector, callbacks) {
  var ok = callbacks.ok || function () {};
  var cancel = callbacks.cancel || function () {};

  var events = {};
  events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
    function (evt) {
      if (evt.type === "keydown" && evt.which === 27) {
        // escape = cancel
        cancel.call(this, evt);

      } else if (evt.type === "keyup" && evt.which === 13 ||
                 evt.type === "focusout") {
        // blur/return/enter = ok/submit if non-empty
        var value = String(evt.target.value || "");
        if (value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };

  return events;
};
//*******************************


Template.main.greeting = function () {
 	return "Welcome to futureference.";
};

Template.main.userQuotes = function() {
 	return Quotes.find({owner: Meteor.userId()});
};

Template.userPage.userName = function() {
	return "Kate";
	//eventually return the Session variable that has the page stored
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

Template.main.quote = function() { 
	//this is the main page, so it just shows the quotes 
	//of the logged in user
 	return Quotes.find({owner: Meteor.userId()});
};

Template.userPage.user = function() {
	//this is hardcoded to my test account right now
	//eventually it should be tied to a Session variable like
	//Session.get("currentPage", userId);
	return Quotes.find({owner: Session.get("currentPage")});
}

Template.main.events({});

Template.quote.events({
	'click' : function() {
		if (Session.get("selectedQuote") == this._id)
			Session.set("selectedQuote", null);
		else
			Session.set("selectedQuote", this._id);
	},
	'click input.btnDelete': function(){
		Meteor.call("deleteQuote", Meteor.userId(), this._id);
	}
});

//for the addquote enter key button
Template.userPage.events(okCancelEvents('#txtAddQuote',{
	ok: function(text, evt){
		Meteor.call("addQuote", Session.get("currentPage"), text);
		evt.target.value = "";
	}
}));

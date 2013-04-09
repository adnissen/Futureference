Template.api.loggedIn = function(){
	return Meteor.userId();
}

Template.api.key = function(){
	Meteor.call("getApiKey", Meteor.userId(), function(err, data){
		Session.set("key", data);
	});
	return Session.get("key");
}

Template.api.events({
	'click input.btnGenKey':function(){
		Meteor.call("generateApiKey", Meteor.userId(), function(err, data){
			Session.set("key", data);
		});
	}
})
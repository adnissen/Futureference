Template.alerts.active = function(){
	return Session.get("alertActive");
};

Template.alerts.type = function() {
	return Session.get("alertType");
};

Template.alerts.strongtext = function(){
	return Session.get("alertStrongText");
};

Template.alerts.content = function(){
	return Session.get("alertContent");
}

Template.alerts.events({
	'click button.close':function(){
		Session.set("alertActive", 0);
	}
});
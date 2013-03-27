Template.alerts.type = function(){
	return Session.get("alertActive");
};

Template.alerts.type = function() {
	return Session.get("alertType");
};

Template.alerts.type = function(){
	return Session.get("alertStrongText");
};

Template.alerts.type = function(){
	return Session.get("alertContent");
}

Template.alerts.events({
	'click button.close':function(){
		Session.set("alertActive", 0);
	}
});
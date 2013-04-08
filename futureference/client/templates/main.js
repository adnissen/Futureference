Template.main.currentPage = function() {
	return Session.get("currentPage");
};

Template.main.api = function(){
	return Session.get("currentPage") == "api";
};

Template.main.events({

});
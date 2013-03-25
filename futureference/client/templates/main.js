Template.main.currentPage = function() {
	return Session.get("currentPage");
};

Template.main.events({
	'click input.btnHome':function(){
		Session.set("currentPage", 0);
	}
});
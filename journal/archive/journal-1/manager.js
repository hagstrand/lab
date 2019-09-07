function Manager() {
	this.timer = null;
	this.postwin = null;
	this.interval = 10*60000; // 10 minutes
	this.lat = 0.0;
	this.lon = 0.0;
}
Manager.prototype = {
	setup: function() {
		var self = this;
		window.addEventListener("message", function(evt) {self.receive(evt)}, false);

	    // start tracking geo position
	    var options = {
	    	timeout:10000,
	    	maximumAge:10000,
	    	enableHighAccuracy:true
	    }
	},
	// https://developer.mozilla.org/en/dom/window.postmessage
	receive: function(evt) {
		this.log(evt.data);
		if (evt.data == 'close') {
			this.closeJournal();
		}
	},
	start: function() {
		var self = this;
		this.timer = window.setInterval(function() {self.openJournal();}, this.interval);
		this.openJournal();
	},
	stop: function() {
		window.clearInterval( this.timer);
	},
	openJournal: function() {
		jgh.$('audiobell').play();
		this.postwin = window.open("journal.html", "journal", "width=600, height=400, location=0, menubar=0, resizable=0, scrollbars=0, status=0, titlebar=0, toolbar=0");
	},
	closeJournal: function() {
		this.postwin.close();
	},
	menu: function(show) {
		jgh.$('menu').style.display = (show) ? 'block' : 'none';
	},
	settings: function(show) {
		jgh.$('settings').style.display = (show) ? 'block' : 'none';
		this.menu(false);
	},
	log: function(msg) {
		console.log(msg);
	}
}

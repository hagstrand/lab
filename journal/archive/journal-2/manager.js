function Manager() {
	this.timer = null;
	this.postwin = null;
	this.interval = null;
}

Manager.defaultInterval = 1200000; // 10 minutes

Manager.prototype = {
	setup: function() {
		var self = this;
		if (localStorage["interval"]) {
			this.interval = localStorage["interval"]
		}
		else {
			this.interval = Manager.defaultInterval;
			localStorage["interval"] = this.interval;
		}
		window.addEventListener("message", function(evt) {self.onMessageReceived(evt)}, false);
	    this.start();
	},
	// https://developer.mozilla.org/en/dom/window.postmessage
	onMessageReceived: function(evt) {
		this.log(evt.data);
		var a = evt.data.split(' ');
		switch (a[0]) {
			case 'close':
				this.closeJournal();
			break;
			case 'interval':
				this.setTimer(a[1]);
			break;
		}
	},
	setTimer: function(interval) {
		this.interval = interval;
		localStorage["interval"] = this.interval;
		if (this.timer) {
			window.clearInterval(this.timer);
		}
		var self = this;
		if (this.interval) {
			this.timer = window.setInterval(function() {self.openJournal();}, parseInt(this.interval));
		}
	},
	start: function() {
		this.setTimer(this.interval);
		this.openJournal();
	},
	stop: function() {
		if (this.timer) {
			window.clearInterval( this.timer);
		}
	},
	openJournal: function() {
		if (!this.postwin || (this.postwin && this.postwin.closed)) {
			this.postwin = window.open("journal.html", "journal", "width=400, height=540, location=0, menubar=0, resizable=0, scrollbars=0, status=0, titlebar=0, toolbar=0");
			var audio = jgh.$('audiobell');
			audio.pause();
			audio.setAttribute('src', localStorage['ringtone']+'.mp3');
			audio.load();
			audio.play();
		}
	},
	closeJournal: function() {
		this.postwin.close();
	},
	log: function(msg) {
		console.log(msg);
	}
}

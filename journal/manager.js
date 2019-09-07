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

		this.audio = jgh.$('audiobell');
		this.audio.addEventListener('canplay', function() {self.onCanPlay()}, true);
		this.audio.addEventListener('ended', function() {self.onEnded()}, true);
		this.audio.addEventListener('seeked', function() {self.onSeeked()}, true);
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
			this.timer = window.setInterval(function() {self.openJournal(true);}, parseInt(this.interval));
		}
	},
	start: function() {
		this.setTimer(this.interval);
		this.openJournal(true);
	},
	stop: function() {
		if (this.timer) {
			window.clearInterval( this.timer);
		}
	},
	openJournal: function(audio) {
		if (!this.postwin || (this.postwin && this.postwin.closed)) {
			this.postwin = window.open("journal.html", "journal", "width=400, height=540, location=0, menubar=0, resizable=0, scrollbars=0, status=0, titlebar=0, toolbar=0");
			if (audio) {
				this.playRingtone();
			}
		}
	},
	playRingtone: function() {
		this.audio.pause();
		var filename = 'a/'+localStorage['ringtone']+'.mp3';
		this.audio.setAttribute('src', filename);
		this.audio.load();
		this.looper = parseInt(localStorage['repeat']);
		this.firstTime = 1;
	},
	onCanPlay: function() {
		if (this.firstTime > 0) {
			this.audio.play();
			this.firstTime--;
			this.looper--;
		}
	},
	onEnded: function() {
		if (this.looper > 0) {
			this.audio.pause();
			this.audio.currentTime = 0;
			this.looper--;
		}
	},
	onSeeked: function() {
		this.audio.play();
	},
	closeJournal: function() {
		this.postwin.close();
	},
	log: function(msg) {
		console.log(msg);
	}
}

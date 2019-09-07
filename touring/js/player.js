function Player() {
	this.audio = null;
	this.playing = false;
}
Player.prototype = {
	init: function() {
		//this.audio = new Audio();
		this.audio = document.getElementById("audio1");
		var self = this;
		this.audio.addEventListener('play', function() {self.onPlay()}, true);
		this.audio.addEventListener('pause', function() {self.onPause()}, true);
		this.audio.addEventListener('volumechange', function() {self.onVolume()}, true);
		this.audio.addEventListener('playing', function() {self.onVolume()}, true);
		this.audio.addEventListener('ended', function() {self.onEnded()}, true);
		this.audio.addEventListener('canplay', function() {self.onCanPlay()}, true);

		this.audioLeft = document.getElementById("audioleft");
		this.audioLeft.addEventListener('ended', function() {touring.touring.log('left ended'); self.audio.play()}, true);

		this.audioRight = document.getElementById("audioright");
		this.audioRight.addEventListener('ended', function() {touring.touring.log('right ended'); self.audio.play()}, true);
	},
	playPause: function() {
		if (this.audio.paused) {
			this.audio.play();
		}
		else {
			this.audio.pause();
		}
	},
	playFile: function(filename) {
		this.audio.pause();
		this.audio.setAttribute('src', filename);
		this.audio.load();
		this.audio.play();
	},
	playStory: function(id) {
		touring.touring.log('playStory '+id);
		this.currentId = id;
		if (touring.iphone) {
			var dir = (this.isRight()) ? 'audio/right/right-' : 'audio/left/left-';
			var f = touring.playlist.stack[this.currentId].audiourl;
			f = f.replace('audio/', dir);
			touring.touring.log('play file ' + f);
			this.playFile(f)
			return;
		}
		this.audio.pause();
		this.audio.setAttribute('src', touring.playlist.stack[this.currentId].audiourl);
		this.audio.load();
//		if (touring.iphone) {
//			touring.touring.log('play it now');
//			this.audio.play();
//		}
	},
	onCanPlay: function() {
		if (touring.iphone) {
			return;
		}
		touring.touring.log('onCanPlay');
		var aud;
		if (touring.touring.direction.northbound) {
			if (touring.playlist.stack[this.currentId].rightNorth) {
				aud = this.audioRight;
			}
			else {
				aud = this.audioLeft;
			}
		}	
		else if (touring.touring.direction.southbound) {
			if (touring.playlist.stack[this.currentId].rightNorth) {
				aud = this.audioLeft;
			}
			else {
				aud = this.audioRight;
			}
		}
		else {
			this.audio.play();
			return;
		}
		aud.play();
	},
	setVolume: function(n) {
		this.audio.volume = n;
	},
	onPlay: function() {
		//document.getElementById('playbutton').value = ' | | ';
		this.playing = true;
	},
	onPause: function() {
		//document.getElementById('playbutton').value = ' > ';
		this.playing = false;
	},
	onEnded: function() {
		//document.getElementById('playbutton').value = ' > ';
		this.playing = false;
	},
	onVolume: function() {
		var n = this.audio.volume;
		n *= 10;
		var cls = "vol";
		var chr = "_";
		for (var i=1; i<=10; i++) {
			if (i <= (n)) {
				cls = "volset";
				chr = "_";
			}
			else {
				cls = "vol";
				chr = "_";
			}
			//document.getElementById("vol_"+i).className = cls;
			//document.getElementById("vol_"+i).innerHTML = chr;
		}
	},
	isRight: function() {
		var right = false;
		if (touring.touring.direction.northbound && touring.playlist.stack[this.currentId].rightNorth) {
			right = true;
		}
		if (touring.touring.direction.southbound && !touring.playlist.stack[this.currentId].rightNorth) {
			right = true;
		}
		return right;
	}
}

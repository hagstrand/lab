$ = function(e) {return document.getElementById(e)};

window.addEventListener('load', function() {
	var timerList = $('timer-list');
	var timers = [];

	// collection of functions
	var Thymer = {
		init:function() {
			if ('localStorage' in window) {
				var timersData = window.localStorage.getItem('timers');
				if (timersData) {
					var timersData = JSON.parse(timersData);
					for (var i in timersData) {
						var t = timersData[i];
						timers.push(new Timer(t.name, t.seconds, t.started, t.finished));
					}
					this._start();
				}
			}
		},
		addTimer:function(timer) {
			timers.push(timer);
			this.saveTimers();
			this._start();
		},
		removeTimer:function(timer) {
			for (var i in timers) {
				if (timers[i] == timer) {
					timers.splice(i,1);
					this.saveTimers();
					break;
				}
			}
		},
		saveTimers:function() {
			if ('localStorage' in window) {
				var arr = [];
				for (var i in timers) {
					arr.push(timers[i].toObject());
				}
				window.localStorage.setItem('timers', JSON.stringify(arr));
			}
		},
		_start:function() {
			if (!this.started) {
				this.started = true;
				this.interval = setInterval(function(){
					Thymer._update();
				},1000);
			}
		},
		_update:function() {
			if (timers.length > 0) {
				for (var i in timers) {
					timers[i].update();
				}

			} else {
				clearInterval(this.interval);
				this.interval = null;
				this.started = false;
			}
		}
	};

	// class Timer
	// constructor
	var Timer = function(name, seconds, started, finished) {
		this.name = name;
		this.seconds = seconds;
		this.started = started ? started : new Date().getTime();
		this.finished = finished || false;

		if (!this.name || this.name.trim() == "") {
			this.name = name = "Timer " + Timer.counter++;
		}

		this.el = $("<li><h2 class=name></h2><div class=status></div><div class=progress-box><div class=progress></div></div><a href=# class=remove title=Remove><span>Remove</span></a><a href=# class=reset title=Reset><span>Reset</span></a></li>");
		timerList.append(this.el);

		this.el.children('.name').text(name);
		this.el.children('.remove').click(this, function(event){ event.data.remove(); });
		this.el.children('.reset').click(this, function(event){ event.data.reset(); });

		this.status   = this.el.children('.status');
		this.progress = this.el.find('.progress');

		if (this.finished) {
			this._displayCompleted();
		} else {
			this.update();
		}
	};

	// methods
	Timer.prototype = {
		update:function() {
			if (!this.finished) {
				if (this.check()) {
				this._alarm();
				this._displayCompleted();
				Thymer.saveTimers();
			} else {
				this.status.text(this._buildDisplayString());
				this._setProgress(this.elapsed() / this.seconds);
				}
			}
		},
		remove:function() {
			this.el.remove();
			Thymer.removeTimer(this);
		},
		reset:function() {
			this.started = new Date().getTime();
			this.finished = false;
			Thymer.saveTimers();
			this.update();
		},
		check:function() {
			var remaining = this.calculateRemaining();
			if (remaining <= 0) {
				this.finished = true;
				return true;
			}
			return false;
		},
		elapsed:function() {
			return Math.floor((new Date().getTime() - this.started) / 1000);
		},
		calculateRemaining:function() {
			return this.seconds - this.elapsed();
		},
		_alarm:function() {
			// show a notification if the browser supports it.
			if (window.webkitNotifications && window.webkitNotifications.checkPermission() == 0) {
				window.webkitNotifications.createNotification('clock_32x32.png', 'Thymer', '"' + this.name + '" timer has completed').show();
			}

			// play the alarm sound
			document.getElementById('alarm-sound').play();
		},
		_setProgress:function(v) {
			this.progress.css('width', Math.floor(v * 100) + '%');
		},
		_displayCompleted:function() {
			this.status.text('Completed');
			this._setProgress(1);
		},
		_buildDisplayString:function() {
			var s = [];
			var remaining = this.calculateRemaining();
			remaining = this.buildTimeSegment('h', 60*60, remaining, s);
			remaining = this.buildTimeSegment('m', 60, remaining, s);
			s.push(remaining + 's');
			return s.join(' ');
		},
		buildTimeSegment:function(suffix, divisor, secondsRemaining, segments) {
			var units = Math.floor(secondsRemaining / divisor);
			if (units > 0) {
				segments.push(units + suffix);
				return secondsRemaining % divisor;
			}
			return secondsRemaining;
		},
		toObject:function() {
			return {
				name: this.name,
				seconds: this.seconds,
				started: this.started,
				finished: this.finished
			};
		}
	};

	// class variable
	Timer.counter = 0;

	// form handlers
	var formHint = document.querySelectorAll('#add-timer-form small')[0];
	var es = document.querySelectorAll('#add-timer-form input');
	for (var e,i=0; i<es.length; i++) {
		e = es[i];
		e.addEventListener('keydown', function(event) {
			if (event.which == '13') { // Enter key
				event.preventDefault();
				var seconds = parseInt($('secs').value) +
					(parseInt($('mins').value) * 60) +
					(parseInt($('hours').value) * 60 * 60);

				Thymer.addTimer(new Timer($('timer-name').value, seconds));
				$('timer-name').value = '';

				// request notifications permission if API is supported.  We do
				// this here because we can only do this on user triggered events.
				if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
					window.webkitNotifications.requestPermission();
				}
			}
		});
		
		e.addEventListener('focus', function() {
			formHint.classList.add('visible');
		}, false);
	  
		e.addEventListener('blur', function() {
			formHint.classList.remove('visible');
		}, false);
	}

	formHint.classList.remove('visible');

	// load stored timers
	Thymer.init();

	// check for updates
	if (false) { //('applicationCache' in window) {
		$('update-button').addEventListener('click', function() {
			// Ensure the browser uses the latest version of the code
			window.applicationCache.swapCache();
			// Reload the application
			window.location.reload();
		}, false);

		window.applicationCache.addEventListener('updateready', function() {
			$("update").show();
		}, false);

		// Check for updates when the browser comes back online
		$(document.body).bind('online', function(){
			window.applicationCache.update();
		});
	}
}, false);

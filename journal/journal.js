function Journal() {
	this.keepAliveTimer = null;
	this.currentPanel = 'journal';
	this.menuIsShowing = false;
}
Journal.xmlstring = ''+
	'<request>'+
		'<action>insert</action>'+
		'<id>0</id>'+
		'<version>0</version>'+
		'<token>@token@</token>'+
		'<feeling>@feeling@</feeling>'+
		'<abstract><![CDATA[@story@]]></abstract>'+
		'<when>@time@</when>'+
		'<datatype>12</datatype>'+
		'<headline><![CDATA[]]></headline>'+
	'</request>';
Journal.intervals = [
	{ndx: 0, value:"0"        , text: "(no alerts)" },
	{ndx: 1, value:"30000"    , text: "30 seconds"  },
	{ndx: 2, value:"60000"    , text: "1 minute"    },
	{ndx: 3, value:"300000"   , text: "5 minutes"   },
	{ndx: 4, value:"600000"   , text: "10 minutes"  },
	{ndx: 5, value:"1200000"  , text: "20 minutes"  },
	{ndx: 6, value:"2400000"  , text: "30 minutes"  },
	{ndx: 7, value:"3600000"  , text: "1 hour"      },
	{ndx: 8, value:"7200000"  , text: "2 hours"     },
	{ndx: 9, value:"10800000" , text: "3 hours"     },
	{ndx:10, value:"14400000" , text: "4 hours"     },
	{ndx:11, value:"21600000" , text: "6 hours"     },
	{ndx:12, value:"43200000" , text: "12 hours"    },
	{ndx:13, value:"86400000" , text: "24 hours"    }
];

Journal.keepAliveTime = 20000;  // 20 seconds
Journal.defaultNextAd = '<a href=�http://www.huxleysparrot.com/about�>http://www.huxleysparrot.com/about</a>';
Journal.defaultInterval = '2400000';
Journal.defaultRingTone = 'parrot';
Journal.defaultRepeat = 1;
Journal.defaultStartTime = 0;
Journal.defaultStopTime  = 0;
Journal.defaultRemindMe = 'Write your journal entry here';

Journal.prototype = {
	setup: function() {
		this.initSettings();
		jgh.$('tinterval').innerHTML = this.intervalValueToText(localStorage['interval']);

		var self = this;
		jgh.$('tfeeling').onchange = function() {self.onFeeling()};
		jgh.$('sinterval').onchange = function() {self.onInterval()};
		
		if (!localStorage['nextad']) {
			localStorage['nextad'] = Journal.defaultNextAd;
		}

		jgh.$('journal').onclick = function() {self.stayAlive()};
		this.keepAliveTimer = window.setTimeout(function() {self.close();}, Journal.keepAliveTime);

		jgh.$('tstory').innerHTML = localStorage['remindme'];

		if (!jgh.user.isLoggedIn()) {
			jgh.user.autoRegister();
		}
		this.showAd();
	},
	stayAlive: function() {
		if (this.keepAliveTimer) {
			clearTimeout(this.keepAliveTimer);
		}
	},
	onFeeling: function() {
	},
	onInterval: function() {
		var interval = jgh.$('sinterval').options[jgh.$('sinterval').selectedIndex].value;
		localStorage['interval'] = interval;
		jgh.$('tinterval').innerHTML = this.intervalValueToText(interval);
		if (opener) {
			opener.postMessage("interval "+interval, "*");
		}
	},
	showAd: function() {
		jgh.$('ad').innerHTML = localStorage['nextad'];
		this.getNextAd();
	},
	getNextAd: function() {
		var xhr = new Xhr();
		var self = this;
		xhr.method = "GET";
		xhr.program = "getNextAd";
		xhr.params = {"token":jgh.user.token};
		xhr.callback = function(response,req) {self.onGetAdReturn(response, req);};
		xhr.callServer();
	},
	onGetAdReturn: function(response, req) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(response, "text/xml");
		var status = '';
		if (dom.getElementsByTagName("status")) {
			status = dom.getElementsByTagName("status")[0].textContent;
		}
		if (status == "ok") {
			var copy = dom.getElementsByTagName("copy")[0].textContent;
			localStorage['nextad'] = copy;
		}
		else {
			localStorage['nextad'] = Journal.defaultNextAd;
		}
	},
	 /** Event Handler.  Called when the user clicks the save button.
	 * @event
	 */
	post: function() {
		var tfeeling = jgh.$('tfeeling').value;
		var tstory = jgh.$('tstory').value;
		var s = this.composeXml(tfeeling, tstory);

		var xhr = new Xhr();
		var self = this;
		xhr.method = "POST";
		xhr.program = "update";
		xhr.params = {"token":jgh.user.token};
		xhr.data = s;
		xhr.callback = function(response,req) {self.onPostReturn(response, req);}
		xhr.callServer();
	},
	onPostReturn: function(response,req) {
		this.close();
	},
	cancel: function() {
		this.close();
	},
	close: function() {
		opener.postMessage("close", "*");
	},
	/**
	 * Compose the XML to update the record based on the user's changes.
	 */
	composeXml: function(feeling, story) {
		var s = Journal.xmlstring;
		s = s.replace('@token@', jgh.user.token);
		s = s.replace('@feeling@', feeling);
		s = s.replace('@story@', story);

		var wb = new When( new Date(), When.SECOND);  // current time
		var time = wb.format("detail");
		s = s.replace('@time@', time);
		return s;
	},
	intervalToIndex: function(interval) {
		for (var i=0; i<Journal.intervals.length; i++) {
			if (Journal.intervals[i].value == interval) {
				return i;
			}
		}
		return 0; // never happens
	},
	intervalValueToText: function(interval) {
		for (var i=0; i<Journal.intervals.length; i++) {
			if (Journal.intervals[i].value == interval) {
				return Journal.intervals[i].text;
			}
		}
		return ''; // never happens
	},
	getOptionIndex: function(el, value) {
		for (var i=0; i<el.length; i++) {
			if (el[i].value == value) {
				return i;
			}
		}
		return 0; // never happens
	},
	/**
		journal
		registerWelcome
		loginWelcome
		logoutWelcome
		menu
		settings
		register
		login
	**/	
	switchPanel: function(newpanel) {
		jgh.$(this.currentPanel).style.display = 'none';
		this.currentPanel = newpanel;
		jgh.$(this.currentPanel).style.display = 'block';
	},
	menuToggle: function() {
		this.menuIsShowing = !this.menuIsShowing;
		jgh.$('menu').style.display = (this.menuIsShowing) ? 'block' : 'none';
	},
	settings: function(show) {
		jgh.$('setting_wid').innerHTML = document.body.clientWidth;
		jgh.$('setting_ht').innerHTML  = document.body.clientHeight;
		jgh.$('sringtone').selectedIndex   = this.getOptionIndex(jgh.$('sringtone'), localStorage['ringtone']);
		jgh.$('srepeat').selectedIndex     = this.getOptionIndex(jgh.$('srepeat'), localStorage['repeat']);
		jgh.$('sinterval').selectedIndex = this.intervalToIndex(localStorage['interval']);
		jgh.$('sstarttime').value    = localStorage['starttime'];
		jgh.$('sstoptime').value     = localStorage['stoptime'];
		jgh.$('sremindme').value = localStorage['remindme'];
		jgh.$('settings').style.display = (show) ? 'block' : 'none';
		this.switchPanel('settings');
	},
	saveSettings: function() {
		localStorage['ringtone']     = jgh.$('sringtone')[jgh.$('sringtone').selectedIndex].value; 
		localStorage['repeat']       = jgh.$('srepeat')[jgh.$('srepeat').selectedIndex].value; 
		localStorage['interval']     = jgh.$('sinterval')[jgh.$('sinterval').selectedIndex].value; 
		localStorage['starttime']    = jgh.$('sstarttime').value; 
		localStorage['stoptime']     = jgh.$('sstoptime').value; 
		localStorage['remindme']     = jgh.$('sremindme').value; 
		this.switchPanel('journal');
	},
	initSettings: function() {
		if (!localStorage['ringtone'])     
			localStorage['ringtone']     = Journal.defaultRingTone;
		if (!localStorage['repeat'])     
			localStorage['repeat']       = Journal.defaultRepeat;
		if (!localStorage['interval'])     
			localStorage['interval']     = Journal.defaultInterval;
		if (!localStorage['starttime'])    
			localStorage['starttime']    = Journal.defaultStartTime;
		if (!localStorage['stoptime'])     
			localStorage['stoptime']     = Journal.defaultStopTime;
		if (!localStorage['remindme'])     
			localStorage['remindme']     = Journal.defaultRemindMe;
		this.switchPanel('journal');
	},
	about: function() {
		window.open("http://www.huxleysparrot.com/about", "About Huxley's Parrot", "width=600, height=540, location=0, menubar=0, resizable=0, scrollbars=0, status=0, titlebar=0, toolbar=0");
	},
	log: function(msg) {
		console.log(msg);
	}
}

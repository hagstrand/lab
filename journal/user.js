// (c) Copyright 2009 MapTeam, Inc.

/**
 * Creates a User object.
 * @constructor
 *
 * @class
 * Represents the VDetail UI Object.
 */
function User() {
	this.username = '';
	this.token = '';
	this.level = 0;

	this.patternStatus = /\<status\>(.*?)\<\/status\>/;
	this.patternMessage = /\<message\>(.*?)\<\/message\>/;
	this.patternToken = /\<token\>(.*?)\<\/token\>/;
	this.patternLevel = /\<level\>(.*?)\<\/level\>/;
	this.patternUsername = /\<username\>(.*?)\<\/username\>/;
}

User.prototype = {
	setup: function() {
		if (localStorage['token']) {
			this.token = localStorage['token'];
			this.level = localStorage['level'];
		}
	},
	isLoggedIn: function() {
		return (this.token) ? true : false;
	},
	requireLogin: function() {
		if (this.token && this.level > 0) {
			return true;
		}
		else {
			jgh.journal.switchPanel('login');
			return false;
		}
	},
	myAccount: function() {
		jgh.journal.switchPanel('myaccount');
		jgh.$('inmyaccountusername').value = this.username;
		jgh.$('inemail').value = email;
	},
	saveMyAccount: function() {
		jgh.$('outmyaccountmsg').innerHTML = '';
		this.username = jgh.$('inusername').value;
		var password = jgh.$('inpassword').value;
		var confirmpassword = jgh.$('inconfirmpassword').value;
		var email = jgh.$('inemail').value;

		if (password != confirmpassword) {
			jgh.$('outmsg').innerHTML = "Enter your password twice.";
			return;
		}

		// compose XML				
		var xml = "";
		xml += "<request>";
		xml += "<username>"+this.username+"</username>";
		xml += "<password>"+password+"</password>";
		xml += "<email>"+email+"</email>";
		xml += "</request>";

		this.log(xml.replace(/\>/g, '&gt;').replace(/\</g, '&lt;'));
		
		var xhr = new Xhr();
		xhr.program = "myaccount";
		xhr.data = xml;
		var self = this;
		xhr.callback = function(response) {
			var match = self.patternStatus.exec(response);
			if (match[1] == 'success') {
				match = self.patternToken.exec(response);
				self.token = match[1];
				match = self.patternLevel.exec(response);
				self.level = parseInt(match[1]);

				jgh.journal.switchPanel('myaccountWelcome');
				jgh.$('loggedout').style.display = 'none';
				jgh.$('loggedin').style.display = 'block';
				jgh.$('loggedinuser').innerHTML = self.username;
			}
			else {
				match = self.patternMessage.exec(response);
				document.getElementById("outmyaccountmsg").innerHTML = 'Save failed. ' + match[1];
			}
			return;
		};
		xhr.callServer();
	},
	registerUI: function() {
		this.username = jgh.$('inusername').value;
		var password = jgh.$('inpassword').value;
		var confirmpassword = jgh.$('inconfirmpassword').value;
		var email = jgh.$('inemail').value;

		if (password != confirmpassword) {
			jgh.$('outmsg').innerHTML = "Enter your password twice.";
			return;
		}
		this.register(this.username, password);
	},
	register: function( username, password, email) {
		// compose XML
		email = email || '';
		var xml = "";
		xml += "<request>";
		xml += "<username>"+username+"</username>";
		xml += "<password>"+password+"</password>";
		xml += "<email>"+email+"</email>";
		xml += "</request>";

		this.log(xml.replace(/\>/g, '&gt;').replace(/\</g, '&lt;'));
		
		var xhr = new Xhr();
		xhr.program = "register";
		xhr.data = xml;
		var self = this;
		xhr.callback = function(response) {
			var match = self.patternStatus.exec(response);
			if (match[1] == 'success') {
				match = self.patternToken.exec(response);
				self.token = match[1];
				match = self.patternLevel.exec(response);
				self.level = parseInt(match[1]);

				localStorage['token'] = self.token;
				localStorage['level'] = self.level;
			}
			else {
				alert('registration failed');
			}
			return;
		};
		xhr.callServer();
	},
	login: function() {
		jgh.$('outloginmsg').innerHTML = '';
		this.username = jgh.$('inloginusername').value;
		var password = jgh.$('inloginpassword').value;

		// compose XML				
		var xml = "";
		xml += "<request>";
		xml += "<username>"+this.username+"</username>";
		xml += "<password>"+password+"</password>";
		xml += "</request>";

		this.log(xml.replace(/\>/g, '&gt;').replace(/\</g, '&lt;'));
		
		var xhr = new Xhr();
		xhr.program = "login";
		xhr.data = xml;
		var self = this;
		xhr.callback = function(response) {
			var match = self.patternStatus.exec(response);
			if (match[1] == 'success') {
				match = self.patternToken.exec(response);
				self.token = match[1];
				match = self.patternLevel.exec(response);
				self.level = parseInt(match[1]);
				
				localStorage['token'] = self.token;
				localStorage['level'] = self.level;

				// display - move to an event handler
				jgh.journal.switchPanel('journal');
			}
			else {
				match = self.patternMessage.exec(response);
				document.getElementById("outloginmsg").innerHTML = 'Login failed. ' + match[1];
			}
			return;
		};
		xhr.callServer();
	},
	authorize: function(token) {
		// compose XML				
		var xml = "";
		xml += "<request>";
		xml += "<token>"+token+"</token>";
		xml += "</request>";

		this.log(xml.replace(/\>/g, '&gt;').replace(/\</g, '&lt;'));
		
		var xhr = new Xhr();
		xhr.program = "auth";
		xhr.data = xml;
		var self = this;
		xhr.callback = function(response) {
			var match = self.patternStatus.exec(response);
			if (match[1] == 'success') {
				match = self.patternUsername.exec(response);
				self.username = match[1];
				match = self.patternToken.exec(response);
				self.token = match[1];
				match = self.patternLevel.exec(response);
				self.level = parseInt(match[1]);
				
				// save token in cookie
				//g.observer.publish('OnLogin', 'user', [self.token]);            

				// display - move to an event handler
				//jgh.journal.switchPanel('loginWelcome');
				jgh.$('loggedout').style.display = 'none';
				jgh.$('loggedin').style.display = 'block';
				jgh.$('loggedinuser').innerHTML = self.username;
			}
			else {
				match = self.patternMessage.exec(response);
				document.getElementById("outloginmsg").innerHTML = 'Login failed. ' + match[1];
			}
			return;
		};
		xhr.callServer();
	},
	logout: function() {
		this.username = '';
		this.token = '';
		this.level = 0;
		
		localStorage['token'] = this.token;
		localStorage['level'] = this.level;

		jgh.journal.switchPanel('login');
	},
	autoRegister: function() {
		var uname = this.generateUnique();
		var pword = this.generateUnique();
		this.register(uname, pword);
	},
	generateUnique: function() {
		var d = new Date();
		d = d.getTime();
		d = 'AND'+d;
		return d;
	},
	log: function(s) {
		console.log(s);
	}
}

// (c) Copyright 2009 MapTeam, Inc.

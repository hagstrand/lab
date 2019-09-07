// (c) Copyright 2005, 2006, 2008, 2009 MapTeam, Inc.

/**
 * Clone of Google GXmlHttp object
 * @function
 */
function JXmlHttp() {}
JXmlHttp.create=function(){
	if(typeof ActiveXObject!="undefined"){
		try{
			return new ActiveXObject("Microsoft.XMLHTTP")
		}
		catch(a){}
	}
	if(typeof XMLHttpRequest!="undefined"){
		return new XMLHttpRequest()
	}
	return null
}

/**
 * Create an Xhr object.
 * @constructor
 *
 * @class
 * Server communications.
 * Wraps Microsoft.XMLHTTP OR XMLHttpRequest()
 */
function Xhr() {
	this.req = null
	if(typeof ActiveXObject!="undefined"){
		try{
			this.req = new ActiveXObject("Microsoft.XMLHTTP")
		}
		catch(a){}
	}
	if(typeof XMLHttpRequest!="undefined"){
		this.req = new XMLHttpRequest()
	}
	this.retries = 0;
	this.maxretries = 0;
	this.params = {};
	this.data = "";
	this.method = "POST";   // GET, PUT, POST, DELETE
	this.program = "";
	this.callback = null;
}

/**
 * URL to access server services.
 * @type String
 * @static
 */
Xhr.base = "http://www.voyc.com/svc/";

Xhr.prototype = {
	/**
	 * Send a request to a server.
	 */
	callServer :function() {
		var params = this.composeParameters(this.params);
		var url = Xhr.base + this.program + params;
		var self = this;
		/** @ignore */
		this.req.onreadystatechange = function() { self._callback() };
		this.req.open(this.method, url, true);
		this.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		this.req.send("data="+escape(this.data));
	},
	/**
	 * Called on return from the server.
	 * @private
	 */
	_callback : function() {
		if (this.req.readyState != 4) {
			return;
		}
		var rc = true;
		try {
			if (this.req.status != 200 && this.req.status != 0) {
				this.log("xhr callback status="+this.req.status)
				rc = false;
			}
			else if (!this.req.responseText) {
				this.log("xhr callback responseText is empty")
				rc = false;
			}
		}
		catch(error) {
			this.log("xhr caught callback error="+error)
			rc = false;
		}
	
		if (!rc) {
			if (this.retries < this.maxretries) {
				this.log("xhr retrying");
				this.retries++;
				this.callServer();
			}
			else {
				if (this.callback) {
					this.callback("server error " + this.req.status);
				}
			}
		}
		else {
			if (this.callback) {
				this.callback(this.req.responseText, this.req);
			}
		}
	},
	/**
	 * Compose a query string to call a service.
	 * @private
	 * @params {Object} params Key-value pairs of parameters to pass to a service.
	 */
	composeParameters : function(params) {
		var s = '';
		var a = "?";
		for (i in params) {
			s += a + i + "=" + params[i];
			a = "&";
		}
		return s;
	},
	log: function(s) {
		console.log(s);
	}
}
// (c) Copyright 2005, 2006, 2008, 2009 MapTeam, Inc.

touring = {};  // all global variables go here
touring.debug = (window.location.search.indexOf("debug") > -1);
touring.iphone = true; // (window.location.search.indexOf("iphone") > -1) || (navigator.userAgent.indexOf("iphone") > -1);

var $ = function(s) {
    return document.getElementById(s);
}
var layout = function() {
	if (touring.debug) {
	    $('debugwindow').style.display = 'block';
	    $('bodyWidth').innerHTML = document.body.offsetWidth;
	    $('bodyHeight').innerHTML = document.body.offsetHeight;
	    $('userAgent').innerHTML = navigator.userAgent;
	}
}

onresize = layout;
onload = function() {
	layout();
	touring.player = new Player();
	touring.player.init();

	touring.playlist = new Playlist();
	touring.playlist.draw(document.getElementById('touring-playlist'));

	touring.touring = new Touring();
	touring.touring.init();
    touring.touring.start();

	if (touring.debug) {
		touring.map = touring.touring.initMap();
	}
}

function Touring() {
    this.previousLocation = null;
    this.direction = null;
    this.marker = null;
    this.polygon = null;
}

Touring.prototype = {
	init: function() {
	    this.previousLocation = {lat:null, lon:null, timestamp:0};
	    this.direction = {northbound:false,southbound:false,eastbound:false,westbound:false};
		touring.player.playFile('audio/intro.mp3');
	},
	test: function() {
		var testPosition = {};
		testPosition.coords = {};
	    this.previousLocation.lat = 33.014403;
	    this.previousLocation.lon = -117.280278;
	    this.previousLocation.timestamp = new Date();
		testPosition.coords.latitude  = 33.014003;
		testPosition.coords.longitude = -117.280278;
		this.direction.southbound = true;
		this.scrollMap(testPosition);
	},
	testLeft: function() {
		touring.player.audioLeft.play();
	},
	scrollMap: function(position) {
	    var timestamp = new Date();
	
	    // calc direction
	    var latdiff = position.coords.latitude - this.previousLocation.lat;
	    var londiff = position.coords.longitude - this.previousLocation.lon;
	    var timediff = timestamp - this.previousLocation.timestamp;
	    if (!latdiff && !londiff && (timediff > 5000) || !this.previousLocation.lat) {
	        this.direction.northbound = this.direction.southbound = this.direction.westbound = this.direction.eastbound = false;
	    }
	    else {
	        this.direction.northbound = (latdiff > 0);
	        this.direction.southbound = (latdiff < 0);
	        this.direction.westbound = (londiff > 0);
	        this.direction.eastbound = (londiff < 0);
	    }
	
		$('viewLat').innerHTML = position.coords.latitude;
		$('viewLon').innerHTML = position.coords.longitude;
		$('viewDir').innerHTML = (this.direction.northbound) ? 'Northbound' : (this.direction.southbound) ? 'Southbound' : '';
		$('viewTime').innerHTML = timestamp.getHours()+':'+timestamp.getMinutes()+':'+timestamp.getSeconds();
		$('viewMode').innerHTML = (touring.iphone) ? 'iPhone' : '';

	    // save previous location
	    this.previousLocation.lat = position.coords.latitude;
	    this.previousLocation.lon = position.coords.longitude;
	    this.previousLocation.timestamp = timestamp;
	
		// calc tolerance around the point
		var hitbox = this.calcHitbox({lat:position.coords.latitude, lon:position.coords.longitude});

		// draw the screen
		if (touring.debug) {
		    document.getElementById('lat').innerHTML = position.coords.latitude;
		    document.getElementById('lon').innerHTML = position.coords.longitude;
		    document.getElementById('northbound').innerHTML = this.direction.northbound;
		    document.getElementById('southbound').innerHTML = this.direction.southbound;
		    document.getElementById('eastbound').innerHTML = this.direction.eastbound;
		    document.getElementById('westbound').innerHTML = this.direction.westbound;
		    document.getElementById('touring-log').innerHTML += "Lat:" + position.coords.latitude + " Lon:" + position.coords.longitude + " Time:" + timestamp + "<br/>";
	
			// draw or move the point on the map
	        var ll = new GLatLng(position.coords.latitude, position.coords.longitude);
	        if (!this.marker) {
				this.marker = new GMarker(ll, {draggable: true});
				touring.map.addOverlay(this.marker);
			}
			else {
				this.marker.setLatLng(ll);
				touring.map.removeOverlay(this.polygon);
			}

			// draw the hitbox on the map
			this.polygon = new GPolygon([
				new GLatLng(hitbox.n, hitbox.w),
				new GLatLng(hitbox.n, hitbox.e),
				new GLatLng(hitbox.s, hitbox.e),
				new GLatLng(hitbox.s, hitbox.w),
				new GLatLng(hitbox.n, hitbox.w)
			], "#f33f00", 5, 1, "#ff0000", 0.2);
			touring.map.addOverlay(this.polygon);
		}
				
		// is there an item to play
		if (!touring.player.playing) {
			var item = touring.playlist.findNext(hitbox);
			if (item >= 0) {
				$('trackName').innerHTML = touring.playlist.stack[item].played = true;
				$('trackName').innerHTML = touring.playlist.stack[item].title;
			//	$('photo').src = touring.playlist.stack[item].photourl;
				touring.player.playStory(item);
			}
		}
	},
	log: function(msg) {
		if (touring.debug) {
		    document.getElementById('touring-log').innerHTML += msg + "<br/>";
		}
	},
	reportError: function() {
	    var timestamp = new Date();
	    document.getElementById('touring-log').innerHTML += "error " + timestamp + "<br/>";
	},
	start: function() {
		if (touring.debug) {
			return;
		}

	    // start tracking position
	    var options = {
	    	timeout:10000,
	    	maximumAge:10000,
	    	enableHighAccuracy:true
	    }
	    var self = this;
	    var watchId = navigator.geolocation.watchPosition(
	    	function(pos) {self.scrollMap(pos);}, 
	    	function() {self.reportError();}, 
	    	options
	    );
	},
	stop: function() {
	    // Cancel the updates when the user clicks a button.
	    navigator.geolocation.clearWatch(watchId);
	    watchId = null;
	},
	calcHitbox: function(pt) {
		this.oneBlockLat = 0.00115121426238;
		this.oneBlockLon = 0.00104069709777;
		
		this.threshhold = {};
		this.threshhold.e = this.oneBlockLon / 2;
		this.threshhold.w = 0 - (this.oneBlockLon / 2);

		if (this.direction.northbound) {
			this.threshhold.n = 0 + (this.oneBlockLat * 1.5);
			this.threshhold.s = 0 + (this.oneBlockLat * 0.5);
		}
		else if (this.direction.southbound) {
			this.threshhold.n = 0 - (this.oneBlockLat * 0.5);
			this.threshhold.s = 0 - (this.oneBlockLat * 1.5);
		}
		else {
			this.threshhold.n = (this.oneBlockLat/2);
			this.threshhold.s = 0 - (this.oneBlockLat/2);
		}
		
		var bbox = {};
		bbox.n = pt.lat + this.threshhold.n;
		bbox.s = pt.lat + this.threshhold.s;
		bbox.e = pt.lon + this.threshhold.e;
		bbox.w = pt.lon + this.threshhold.w;
		return bbox;
	},
	initMap: function() {
		if (!touring.debug) {
			return null;
		}

		var map = new GMap2(document.getElementById("map"));
		map.setCenter(new GLatLng(33.014723, -117.280278), 15);
		map.addControl(new GMapTypeControl());
		map.enableContinuousZoom();
		map.enableDoubleClickZoom();
		map.addControl(new GSmallMapControl());
	
		GEvent.addListener(map, "click", function(overlay, latlng) {
			if (latlng) { 
				var position = {};
				position.coords = {};
				position.coords.latitude  = latlng.lat();
				position.coords.longitude = latlng.lng();
				touring.touring.scrollMap(position);
			}
		});

		// draw a line or a point for each story
	    for (var i=0; i<touring.playlist.stack.length; i++) {
			var story = touring.playlist.stack[i];
	
			if (story.nLat == story.sLat && story.nLon == story.sLon) {
		        var ll = new GLatLng(story.nLat, story.nLon);
				var marker = new GMarker(ll, {draggable: true});
				map.addOverlay(marker);
			}
			else {
				var polyline = new GPolyline([
					new GLatLng(story.nLat, story.nLon),
					new GLatLng(story.sLat, story.sLon)
				], "#0000ff", 5, 1);
				map.addOverlay(polyline);
			}
		}

		return map;
	}
}

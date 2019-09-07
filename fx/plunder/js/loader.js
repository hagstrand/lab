/**
	class Loader
	singleton
	@constructor
*/
plunder.Loader = function() {
	this.path = 'assets/';
	this.imagePaths = {
		hero: this.path+'character.png', 
		tileset: this.path+'tiles.png'
	};
	this.images = {};
	
	this.tiles = [];  // {x:24, y:12, img:}
};

// load all the assets
plunder.Loader.prototype.load = function (cb) {
	var cbload = cb;

	this.buildTileList();

	var promises = [];
	for (var key in this.imagePaths) {
		var path = this.imagePaths[key];
		var p = this.loadImage(key, path);
		promises.push(p);
	}

	Promise.all(promises).then(
		function(reason) {
			console.log('success:' + reason);
			cbload(true);
		},
		function(reason) {
			console.log('failed:' + reason);
			cbload(false);
		}
	);
}

// function getImage returns a promise.  (Therefore, getImage IS a promise.)
plunder.Loader.prototype.loadImage = function(key, path) {
	var self = this;
	var p = new Promise(function(resolve, reject) {
		var img = new Image();
		img.onload = function() {
			self.images[key] = img;
			resolve(key);
		}
		img.onerror = function() {
			reject(key);
		}
		img.onabort = function() {
			reject(key);
		}
		img.src = path;
	})
	return p;
}

plunder.Loader.prototype.buildTileList = function() {
	var promises = [];
	for (var y=12; y<=14; y++) {
		for (var x=21; x<=25; x++) {
			fname = 'kh_y' + y + '_x' + x + '_z5.jpg';
			path = this.path+'tiles/' + fname;
			key = y + '_' + x;
			this.imagePaths[key] = path;
		}
	}
}

/**
	class Sprite
**/

Sprite = function() {
	this.width = 180;
	this.height = 135;
	this.numframes = 8;
	this.numrows = 1;
	this.fps = 50;
	this.name = 'explosion-2';
	this.imageurl = 'this.name';
	this.soundurl = 'this.name';

	// working
	this.container = null;
	this.e = null;
	this.x = 0;
	this.y = 0;
	this.f = -1;
	this.ms = 100;
}

Sprite.prototype.setup = function(container, a) {
	this.container = container;
	this.width = a.w;
	this.height = a.h;
	this.numframes = a.c;
	this.numrows = a.r;
	this.fps = a.f;
	this.name = a.n;
	this.imageurl = a.imageurl || this.name;
	this.soundurl = a.soundurl || this.name;
	this.ready = false;

	this.ms = 1000 / this.fps;
	this.e = document.getElementById(this.name);

	// load image
	this.image = new Image();
	this.imageloaded = false;
	var self = this;
	this.image.onload = function() {self.onloadimage();};
	this.image.src = this.imageurl;

	// load audio
	this.audioLoaded = false;
}

Sprite.prototype.onloadimage = function() {
	this.imageloaded = true;
	if (this.imageloaded && this.soundloaded) {
		this.ready = true;
		// publish ready message
	}
}

Sprite.prototype.explode = function() {
	var self = this;
	var interval = setInterval(function() { 
		var boo = self._explode(); 
		if (!boo) {
			clearInterval(interval);
		}
	}, this.ms);
}

Sprite.prototype._explode = function() {
	if (this.f < 0) {
		this.f = 0;
	}

	this.container.width = this.container.offsetWidth;
	this.container.height = this.container.offsetHeight;
    var ctx = this.container.getContext("2d");
	var cropx = this.width * this.f;
	var cropy = 0;
	var posx = this.x - (this.width/2);
	var posy = this.y - (this.height/2);
    ctx.drawImage(this.image, cropx, cropy, this.width, this.height, posx, posy, this.width, this.height);
	
	this.f++;
	if (this.f > this.numframes) {
		this.f = -1;
	}
	return (this.f >= 0);  // return false to stop the animation
}

Sprite.prototype.moveTo = function(x,y) {
	this.x = x;
	this.y = y;
}

Sprite.prototype.jumpTo = function(x,y) {
	this.x = x;
	this.y = y;
}

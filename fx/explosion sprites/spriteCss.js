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

	// working
	this.container = null;
	this.e = null;
	this.x = 0;
	this.y = 0;
	this.f = 0;
	this.interval = null;
}

Sprite.prototype.setup = function(container, a) {
	this.container = container;
	this.width = a.w;
	this.height = a.h;
	this.numframes = a.c;
	this.numrows = a.r;
	this.fps = a.f;
	this.name = a.n;

	this.ms = 1000 / this.fps;
	this.e = document.getElementById(this.name);
}

Sprite.prototype.explode = function() {
	this.f = 0;
	var self = this;
	this.interval = setInterval(function() {
		self.e.classList.remove(self.name + '-' + self.f);
		self.f++;
		self.e.classList.add(self.name + '-' + self.f);
		if (self.f > self.numframes) {
			clearInterval(self.interval);
		}
	}, self.ms);
}

Sprite.prototype.moveTo = function(x,y) {
	this.x = x;
	this.y = y;
}

Sprite.prototype.jumpTo = function(x,y) {
	this.x = x;
	this.y = y;
}

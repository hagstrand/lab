/**
	class Plunder
	singleton
	Loads resources and then executes the animation loop.
	@constructor
*/
plunder.Plunder = function() {
	this.elem = null;
	this.ctx = null;
	this.w = 0;
	this.h = 0;
    this.previousElapsed = 0;
	
	this.game = null;
	this.keyboard = null;

}

plunder.Plunder.prototype.start = function () {
	this.loader = new plunder.Loader();
	log&&console.log('loading');
	var self = this;
	this.loader.load(function() {
		self.run();
	});
	this.elem = document.getElementById('world');
	this.ctx = this.elem.getContext('2d');
	this.w = this.elem.offsetWidth;
	this.h = this.elem.offsetHeight;
	this.elem.width = this.w;
	this.elem.height = this.h;

	this.game = new voyc.fx.Game();
	this.game.onRender = function(elapsed) {self.render(elapsed)};

	this.keyboard = new voyc.fx.Keyboard();
	this.keyboard.listenForEvents([
		voyc.fx.Keyboard.LEFT, 
		voyc.fx.Keyboard.RIGHT, 
		voyc.fx.Keyboard.UP, 
		voyc.fx.Keyboard.DOWN,
		voyc.fx.Keyboard.ESC
	]);

	
	this.hero = {};
	this.world = {};
	this.camera = {};
	this.tile = {};
	
	// hero is the protagonist's position in the world
	this.hero.x = 600;
	this.hero.y = 300;
	this.hero.w = 64;
	this.hero.h = 64;

	this.tilesize = 256;

	this.tile.x = 0;
	this.tile.y = 0;
	this.tile.w = this.tilesize;
	this.tile.h = this.tilesize;
	
	// world is the rectangle of the totality of what we have
	this.world.rows = 3;
	this.world.cols = 5;
	this.world.x = 0;
	this.world.y = 0;
	this.world.w = world.cols * this.tilesize;   // 5 * 256 = 1280
	this.world.h = world.rows * this.tilesize;   // 3 * 256 = 768

	// camera is the rectangle shown on screen
	this.camera.x = 100;
	this.camera.y = 100;
	this.camera.w = this.w;
	this.camera.h = this.h;

}


plunder.Plunder.prototype.run = function () {
	log&&console.log('start');
	this.game.start();
}

plunder.Plunder.prototype.render = function (delta) {
	log&&console.log('render ' + delta);

	var vectors = this.moveHero(delta);
	if (vectors) {
		this.moveCamera(vectors);
		this.drawBackground();
		this.drawHero();
	}
	
	if (this.keyboard.isDown(voyc.fx.Keyboard.ESC)) {
		log&&console.log('stop requested')
		this.game.stop();
	}
}

plunder.Plunder.prototype.drawBackground = function () {
    var startCol = 21;
    var endCol = 25;
    var startRow = 12;
    var endRow = 14;

    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
			var name = r + '_' + c;
			this.ctx.drawImage(
				this.loader.images[name], // image

				this.tile.x, // source x
				this.tile.y, // source y
				this.tile.w, // source width
				this.tile.h, // source height

				0-this.camera.x + ((c-startCol)*this.tilesize),  // target x
				0-this.camera.y + ((r-startRow)*this.tilesize), // target y
				this.tile.w, // target width
				this.tile.h // target height
			);
		}
	}
};

plunder.Plunder.prototype.moveHero = function (delta) {
	// 16 microseconds per frame
	// 1 pixel per frame
	var speed = 16; //  pixels Per Microsecond  
	var vector = delta / speed;

	var left = (this.keyboard.isDown(voyc.fx.Keyboard.LEFT)) ? -1 : 0;
	var right = (this.keyboard.isDown(voyc.fx.Keyboard.RIGHT)) ? 1 : 0;
	var up = (this.keyboard.isDown(voyc.fx.Keyboard.UP)) ? -1 : 0;
	var down = (this.keyboard.isDown(voyc.fx.Keyboard.DOWN)) ? 1 : 0;

	var deltax = (left + right) * vector;
	var deltay = (up + down) * vector;

	if ((this.hero.x + deltax) < this.world.x) {
		deltax = this.world.x - this.hero.x;
	}
	if ((this.hero.x + deltax) > (this.world.x + this.world.w)) {
		deltax = this.hero.x - this.world.x;
	}
	
	this.hero.x += deltax;
	this.hero.y += deltay;

	var r = false;
//	if (deltax + deltay) {
		r = {deltax:deltax, deltay:deltay};
//	}
	return r;
}

plunder.Plunder.prototype.moveCamera = function (vectors) {

	// is the hero into the warning track
	var warningTrack = 32;  // the distance covered by two seconds of walking speed
	var left =  ((this.hero.x - this.camera.x) < warningTrack) ? -1 : 0;
	var right = (((this.camera.x + this.camera.w) - this.hero.x) < warningTrack) ? 1 : 0;

	var up =  ((this.hero.y - this.camera.y) < warningTrack) ? -1 : 0;
	var down = (((this.camera.y + this.camera.h) - this.hero.y) < warningTrack) ? 1 : 0;
	
	var deltax = (left + right) * vectors.deltax;
	var deltay = (up + down)    * vectors.deltay;

	this.camera.x += deltax;
	this.camera.y += deltay;
}

plunder.Plunder.prototype.drawHero = function () {
	this.ctx.drawImage(
		this.loader.images['hero'], // image

		0, // source x
		0, // source y
		this.hero.w, // source width
		this.hero.h, // source height

		this.hero.x - this.camera.x,  // target x
		this.hero.y - this.camera.y, // target y
		16, //this.hero.w, // target width
		16 //this.hero.h // target height
	);
};

window.addEventListener('load', function (evt) {
	plunder.plunder = new plunder.Plunder();
	plunder.plunder.start();
}, false);

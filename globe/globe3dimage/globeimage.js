//file:///C:/Users/John/webapps/lab/globe/globe3dimage/globed3image.html

var world = {}
var texture = {};
var timestamp = new Date();
var land = {};

var log = function(s) {
	var tm = new Date();
	var elapsed = tm - timestamp;
	timestamp = tm;
	console.log(elapsed + 'ms ' + s);
}

log('starting');

var load = function() {
	log('onload');
	world.w = document.body.clientWidth;
	world.h = document.body.clientHeight;
	world.diameter = Math.min(world.w, world.h);
	world.radius = world.diameter / 2;  // whole globe fits perfectly in window
	world.radius = world.diameter * 2;  // zoomed in

	// focus point.  centerpoint of circle facing the user.
	world.lat = -20;
	world.lng = -80;

	world.projection = d3.geo.orthographic();
	world.projection.scale(world.radius);                  // size of the circle
	world.projection.translate([world.w/2, world.h/2]);  // position the circle within the canvas (centered)
	world.projection.rotate([world.lat, world.lng]);              // set geo coord of focus point
	world.projection.clipAngle(90);                  // clip everything outside the circle (90 degrees from the focus point)

	world.path = d3.geo.path();
	world.path.projection(world.projection);

	world.globe = {type: "Sphere"};
	world.graticule = d3.geo.graticule();

	world.canvas = document.createElement('canvas');
	world.canvas.width  = world.w;
	world.canvas.height = world.h;
	world.canvas.style.width =  world.w + 'px';
	world.canvas.style.height = world.h + 'px';
	world.elem = document.getElementById('world');
	world.elem.appendChild(world.canvas);
	world.ctx = world.canvas.getContext("2d");
	world.imageData = world.ctx.createImageData(world.w, world.h);

	land = topojson.object(worldtopo, worldtopo.objects.land);
	countries = topojson.object(worldtopo, worldtopo.objects.countries);

	// initialize texture.  A flat source bitmap image to be wrapped around the globe.
	texture.w = 10800;
	texture.h = 5400;
	texture.projection = d3.geo.equirectangular();
	texture.projection.scale(1720);  // determined through trial and error.  Scale is supposed to be == width in pixels.
	texture.projection.translate([texture.w / 2, texture.h / 2]);
	texture.canvas = document.createElement('canvas');
	texture.canvas.width = texture.w;
	texture.canvas.height = texture.h;
	texture.canvas.style.width  = texture.w + 'px';
	texture.canvas.style.height = texture.h + 'px';
	texture.ctx = texture.canvas.getContext("2d");
	texture.elem = document.getElementById('texture');
	texture.elem.appendChild(texture.canvas);
	texture.image = new Image();
	texture.image.onload = function() {
		log('texture loaded');
		texture.ctx.drawImage(texture.image, 0, 0);
		log('image drawn');
		texture.imageData = texture.ctx.getImageData(0, 0, texture.w, texture.h);
		log('image data got');
		draw();
		animate();
	};
	log('load texture');
	//texture.image.src = 'file://C:\\Users\\John\\webapps\\lab\\globe\\globe3dimage\\earth1024x1024.jpg';
	//texture.image.src = 'file://C:\\Users\\John\\webapps\\lab\\globe\\globe3dimage\\earth2048x1024.jpg';
	//texture.image.src = 'file://C:\\Users\\John\\webapps\\lab\\globe\\globe3dimage\\NE2_50M_SR.png';
	texture.image.src = 'file://C:\\Users\\John\\webapps\\lab\\globe\\globe3dimage\\NE2_50M_SR_W.png';
}

draw = function() {
	log('start draw');
	var tmbegin = new Date();
	
	// update the world position
	world.projection.rotate([world.lng, world.lat]);
	world.projection.scale(world.radius);

	// start drawing
    world.ctx.clearRect(0, 0, world.diameter, world.diameter);

	// oceans.  a blue background circle.
    world.ctx.fillStyle = '#d8ffff';
    world.ctx.beginPath();
	world.path.context(world.ctx)(world.globe);
	world.ctx.fill();

	// image
	drawTexture(world,texture);

	// land, continent outlines in pink
    world.ctx.strokeStyle = '#9f9';
    world.ctx.beginPath();
	world.path.context(world.ctx)(land);
	world.ctx.stroke();

	// countries
    world.ctx.strokeStyle = '#f88';
    world.ctx.beginPath();
	world.path.context(world.ctx)(countries);
	world.ctx.stroke();

	// rivers
	world.ctx.strokeStyle = '#00f';
//	world.ctx.beginPath();
	var fn = world.path.context(riverContext);
	fn(voyc.data.rivers);
//	world.ctx.stroke();
	var fn = world.path.context(world.ctx);

	// graticule
	world.ctx.strokeStyle = '#888';
	world.ctx.beginPath();
	world.path(world.graticule());
	world.ctx.stroke();

	var tmend = new Date();
	var elapsed = tmend.getTime() - tmbegin.getTime();
	console.log('draw time: ' + elapsed + ' ms')
	log('draw complete');
}

drawTexture = function(sphere, texture) {
	// loop thru every pixel in the world
	var co = [];
	var pt = [];
	var wn = 0;
	var tn = 0;
	log('start loop');
	for (var x=0; x<(world.w); x++) {
		for (var y=0; y<(world.h); y++) {
			co = world.projection.invert([x,y]);
			//co = [-20, -80];

			if (!(isNaN(co[0]) || isNaN(co[1]))) {
				pt = texture.projection(co);
				//pt = [300,300]; 
				
				// copy 4 bytes for each pixel
				wn = (y * world.w + x) * 4;
				tn = (Math.floor(pt[1]) * texture.w + Math.floor(pt[0])) * 4;
				world.imageData.data[wn + 0] = texture.imageData.data[tn + 0];
				world.imageData.data[wn + 1] = texture.imageData.data[tn + 1];
				world.imageData.data[wn + 2] = texture.imageData.data[tn + 2];
				world.imageData.data[wn + 3] = 255;
			}
		}
	}
	log('start put');
	world.ctx.putImageData(world.imageData, 0, 0);
	log('finished put');
}

riverContext = {
	pathOpen: false,
	lineInProgress: false,
	arcCount: 0,
	prevPt: [],
	//color: ['#00f','#66f','#39f'],
	color: ['#3cf','#09f','#03c'],
	i:0,
	getColor: function() {
		var r = (this.i++) % 3;
		return this.color[r];
	},
	beginPath: function() {
		pathOpen = true;
	},
	moveTo: function(x,y) {
		lineInProgress = true;
		prevPt = [x,y];
	},
	lineTo: function(x,y) {
		world.ctx.strokeStyle = this.getColor();
		world.ctx.beginPath();
		world.ctx.moveTo(prevPt[0], prevPt[1]);
		world.ctx.lineTo(x, y);
		world.ctx.closePath();
		world.ctx.stroke();
		prevPt = [x,y];
	},
	arc: function(x,y,radius,startAngle,endAngle) {
		arcCount++;
	},
	closePath: function() {
		pathOpen = true;
		lineInProgress = false;
	}
}

var animate = function() {
	setInterval(function() {
		var fn = world.path.context(riverContext);
		riverContext.i--;
		fn(voyc.data.rivers);
	},100);
}

window.addEventListener('load', function() {
	
	load();
	
	window.addEventListener('keydown', function(evt) {
		var scrolldgr = 10;
		switch (evt.keyCode) {
			case 38: (event.shiftKey) ? world.radius += 100 : world.lat -= scrolldgr; break;
			case 40: (event.shiftKey) ? world.radius -= 100 : world.lat += scrolldgr; break;
			case 37: world.lng += scrolldgr; break;
			case 39: world.lng -= scrolldgr; break;
			default: return;
		}
		evt.preventDefault();
		draw();
	}, false);

	document.getElementById('world').addEventListener('click', function(evt) {
		var x = evt.offsetX;
		var y = evt.offsetY;
		var pt = [x,y];
		var co = world.projection.invert(pt);
		console.log('world ' + pt + '; ' + co);
	}, false);
			
	// when debugging, make the texture element visible
	document.getElementById('texture').addEventListener('click', function(evt) {
		var x = evt.offsetX;
		var y = evt.offsetY;
		var pt = [x,y];
		var co = texture.projection.invert(pt);
		console.log('texture ' + pt + '; ' + co);
	}, false);
}, false);

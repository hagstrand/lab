// derived from www.williammalone.com
Sketch = function (canvas, options) {
	this.canvas = canvas;

	// options
	this.penColor = getComputedStyle(this.canvas).color;
	this.hasGrid = false;
	this.gridColor = 'blue';
	this.gridSize = 12;
	if (options) {
		this.setOptions(options);
	}

	// working variables
	this.clickX = [];
	this.clickY = [];
	this.clickDrag = [];
	this.paint = false;

	this.createUserEvents();
}

Sketch.prototype = {
	setOptions: function(options) {
		this.penColor = (options.penColor) ? options.penColor : this.penColor;
		this.hasGrid = (options.hasGrid) ? options.hasGrid : this.hasGrid;
		this.gridColor = (options.gridColor) ? options.gridColor : this.gridColor;
		this.gridSize = (options.gridSize) ? options.gridSize : this.gridSize;
	},
	
	clear: function () {
		this.clickX = [];
		this.clickY = [];
		this.clickDrag = [];
		this.draw();
	},

	clearCanvas: function (ctx) {
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	// Redraws the canvas.
	draw: function () {
		this.canvas.width = parseInt(getComputedStyle(this.canvas).width);
		this.canvas.height = parseInt(getComputedStyle(this.canvas).height);

		var locX,
			locY,
			radius = 5,
			i,
			selected;

		var ctx = this.canvas.getContext('2d');
		this.clearCanvas(ctx);
		if (this.hasGrid) {
			ctx.lineWidth = .07;
			ctx.strokeStyle = this.gridColor;
			this.drawGrid(ctx, this.canvas.width, this.canvas.height, this.gridSize);
		}
		
		ctx.strokeStyle = this.penColor;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = radius;

		// For each point drawn
		ctx.beginPath();
		for (i = 0; i < this.clickX.length; i += 1) {
			// If dragging then draw a line between the two points
			if (this.clickDrag[i] && i) {
				ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
			} else {
				// The x position is moved over one pixel so a circle even if not dragging
				ctx.moveTo(this.clickX[i] - 1, this.clickY[i]);
			}
			ctx.lineTo(this.clickX[i], this.clickY[i]);
			
		}
		ctx.stroke();
	},

	// Adds a point to the drawing array.
	addClick: function (x, y, dragging) {
		this.clickX.push(x);
		this.clickY.push(y);
		this.clickDrag.push(dragging);
	},

	// mouse and touch event handlers
	press: function (e) {
		// Mouse down location
		var sizeHotspotStartX,
			mouseX = e.pageX - e.target.offsetLeft,
			mouseY = e.pageY - e.target.offsetTop;

		if (e.targetTouches) {
			mouseX = e.targetTouches[0].pageX - e.target.offsetLeft;
			mouseY = e.targetTouches[0].pageY - e.target.offsetTop;
		}	
		this.paint = true;
		this.addClick(mouseX, mouseY, false);
		this.draw();
	},

	drag: function (e) {
		if (this.paint) {
			if (e.type.substr(0,5) == 'touch') {
				this.addClick(e.targetTouches[0].pageX - e.target.offsetLeft, e.targetTouches[0].pageY - e.target.offsetTop, true);
			}
			else {
				this.addClick(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, true);
			}

			this.draw();
		}
		// Prevent the whole page from dragging if on mobile
		e.preventDefault();
	},

	release: function () {
		this.paint = false;
		this.draw();
	},

	cancel: function () {
		this.paint = false;
	},

	createUserEvents: function () {
		// Add mouse event listeners to canvas element
		var self = this;
		this.canvas.addEventListener('mousedown', function(e) {self.press(e)}, false);
		this.canvas.addEventListener('mousemove', function(e) {self.drag(e)}, false);
		this.canvas.addEventListener('mouseup',   function(e) {self.release(e)}, false);
		this.canvas.addEventListener('mouseout',  function(e) {self.cancel(e)}, false);

		// Add touch event listeners to canvas element
		this.canvas.addEventListener('touchstart',  function(e) {self.press(e)}, false);
		this.canvas.addEventListener('touchmove',   function(e) {self.drag(e)}, false);
		this.canvas.addEventListener('touchend',    function(e) {self.release(e)}, false);
		this.canvas.addEventListener('touchcancel', function(e) {self.cancel(e)}, false);
	},

	drawGrid: function(ctx, w, h, g) {
		// ctx.lineWidth  set by caller
		// ctx.strokeStyle  set by caller
		ctx.beginPath();

		// verticals
		for (var x = 0.5; x < w; x += g) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
		}

		// horizontals
		for (var y = 0.5; y < h; y += g) {
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
		}

		ctx.stroke();
	},
}

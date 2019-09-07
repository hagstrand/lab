function Graph(elem) {
}

Graph.prototype = {
	attach: function(elem) {
		var canvas = document.createElement('canvas');
		canvas.className = 'graphcanvas';
		elem.appendChild(canvas);

		var pcanvas = document.createElement('canvas');
		pcanvas.className = 'slidercanvas';
		elem.parentNode.appendChild(pcanvas);

		
		// attach canvas to the parent element
		// support w,y,x,y of both parent and child
		// 
		
	},

	draw: function(elem) {
		// Reminder:
		// The drawing is scaled from canvas.width to canvas.style.width.
		// By default, canvas.width=300px, canvas.height=150px.
		// I always make the canvas dimensions match its container element.
		
		var style = window.getComputedStyle(elem);
		var canvas = elem.childNodes[0];
		var w = canvas.width  = parseInt(style.width);
		var h = canvas.height = parseInt(style.height);

		var parent = elem.parentNode;
		var pstyle = window.getComputedStyle(parent);
		var pcanvas = parent.childNodes[1];
		var pw = pcanvas.width  = parseInt(pstyle.width);
		var ph = pcanvas.height = parseInt(pstyle.height);
		
		var value = Number(elem.getAttribute('value'));
		var max = Number(elem.getAttribute('max'));
		var draw = elem.getAttribute('draw');

		var f = value / max;
		var c = style.color;
		var cl = 'rgb(0,255,255)';
		var cr = 'rgb(255,255,0)';

		var ctx = canvas.getContext('2d');
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';   
		ctx.strokeStyle = c	;
		
		if (draw == 'offcenter') {
			var f = (max-value) / max;
			this.drawOffCenter(ctx,w,h,f,cl,cr);
		}
		else if (draw == 'paired') {
			this.drawCombined(ctx,w,h,f,cl,cr);
		}
		else if (draw == 'oneway') {
			this.drawOneWay(ctx,w,h,f,cl,cr);
		}

		var pctx = pcanvas.getContext('2d');
		pctx.lineWidth = .5;
		pctx.lineCap = 'round';   
		pctx.strokeStyle = c	;
		this.drawGrid(pctx,pw,ph,f,c,max);
	},

	drawCombined(ctx,w,h,f,cl,cr) {
		var m = Math.round(w * f);
		
		var rl = [
			{x:0, y:0},
			{x:m, y:0},
			{x:m, y:h},
			{x:0, y:h},
		];
		var rr = [
			{x:m, y:0},
			{x:w, y:0},
			{x:w, y:h},
			{x:m, y:h},
		];

		this.drawPoly(ctx, rl, cl);
		this.drawPoly(ctx, rr, cr);
	},

	drawOffCenter(ctx,w,h,f,cl,cr) {
		var m = Math.round(w/2);
		var v = Math.round(w * f);
		
		var cb = (v<m) ? cl : cr;
		
		var r = [
			{x:m, y:0},
			{x:v, y:0},
			{x:v, y:h},
			{x:m, y:h},
		];
		this.drawPoly(ctx, r, cb);
	},

	drawOneWay(ctx,w,h,f,cl,cr) {
		var m = Math.round(w * f);
		var rl = [
			{x:0, y:0},
			{x:m, y:0},
			{x:m, y:h},
			{x:0, y:h},
		];
		this.drawPoly(ctx, rl, cr);
	},

	drawGrid(ctx,w,h,f,c,max) {
		if (max > 30) {
			max = Math.round(max / 10);
		} 
		var d = Math.round(w / max);
		var m;
		for (var i=0; i<max; i++) {
			m = 0.5 + Math.round(i * d);
			ctx.beginPath();
			ctx.moveTo(m, 0);
			ctx.lineTo(m, h);
			ctx.stroke();
		}
		
		m = w; // - 0.5;
		ctx.beginPath();
		ctx.moveTo(m, 0);
		ctx.lineTo(m, h);
		ctx.stroke();
	},

	drawPoly: function(ctx, a, color) {
		ctx.beginPath();
		ctx.moveTo(a[0].x, a[0].y);
		for (var i=1; i<a.length; i++) {
			ctx.lineTo(a[i].x, a[i].y);
		}
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
		ctx.stroke();
	},
}

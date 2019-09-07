function Bar(elem) {
}

Bar.prototype = {
	attach: function(elem) {
		var canvas = document.createElement('canvas');
		elem.appendChild(canvas);
	},

	draw: function(elem) {
		// canvas.width is NOT equal to canvas.style.width
		// canvas.style.width is the size of the html element
		// canvas.width is the size of the drawing surface
		// By default, canvas.width=300px, canvas.height=150px.
		// The drawing surface is scaled into the size of the HTML element.
		var style = window.getComputedStyle(elem);
		var canvas = elem.childNodes[0];
		var w = canvas.width  = canvas.style.width  = parseInt(style.width);
		var h = canvas.height = canvas.style.height = parseInt(style.height);
		
		var value = elem.getAttribute('value');
		var max = elem.getAttribute('max');
		var draw = elem.getAttribute('draw');

		var f = value / max;
		var c = style.color;
		var cl = 'rgb(255,255,0)';
		var cr = 'rgb(0,255,255)';

		var ctx = canvas.getContext('2d');
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';   
		ctx.strokeStyle = c	;
		
		if (draw == 'offcenter') {
			this.drawOffCenter(ctx,w,h,f,cl,cr);
		}
		else if (draw == 'combined') {
			this.drawCombined(ctx,w,h,f,cl,cr);
		}
	},

	drawCombined(ctx,w,h,f,cl,cr) {
		var m = w * f;
		
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

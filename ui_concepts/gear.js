/*!
 *	Gear version 1.0
 *
 *	Epistemex (c) 2014
 *	www.epistemex.com
*/
/**
 * Renders a gear (cogwheel) to given context and returns an object with
 * the rendered image, notch angle and center offsets for re-use.
 *
 * @param {CanvasRenderingContext2D} dctx - destination image context
 * @param {object} options - option object
 * @param {number} options.x - draw gear at x as center
 * @param {number} options.y - draw gear at y as center
 * @param {number} options.notches - number of notches [3, n]
 * @param {number} options.radiusOuter - outer radius of gear
 * @param {number} options.radiusInner - inner radius of gear
 * @param {number} options.radiusHole - radius of gear hole
 * @param {number} options.taperInner - percentage of inner taper [0, 100]
 * @param {number} options.taperOuter - percentage of outer taper [0, 100]
 * @param {number} options.angleOffset - angle to rotate gear initially by (in radians)
 * @returns {object} Object with properties angle (radians) between each notch, and the gear image for re-use
 * as well as deltaX and deltaY to offset the drawing to draw in center
 */
function DrawGear(dctx, options) {

	options = options || {};

	var x			= options.x || 0,
		y			= options.y || 0,
		notches		= options.notches || 9,
		radiusO		= options.radiusOuter || 50,
		radiusI		= options.radiusInner || 25,
		radiusH		= (typeof options.radiusHole === 'number') ? options.radiusHole : 12,
		taperO		= options.taperOuter || 0,
		taperI		= options.taperInner || 0,
		offset		= options.angleOffset || 0,
		fill		= options.fill || null,
		stroke		= options.stroke || null,
		lineWidth	= options.lineWidth || 1,
		drawFirst	= (typeof options.drawFirst === 'boolean') ? options.drawFirst : true,

		pi2			= 2 * Math.PI,
		angle		= pi2 / (notches * 2),
		taperAI		= angle * taperI * 0.005,
		taperAO		= angle * taperO * 0.005,
		a			= angle,
		toggle		= false,

		canvas		= document.createElement('canvas'),
		ctx			= canvas.getContext('2d'),
		cx, cy;

	canvas.width = radiusO * 2 + lineWidth * 0.5 + 1;
	canvas.height = radiusO * 2 + lineWidth * 0.5 + 1;

	cx = canvas.width * 0.5;
	cy = canvas.height * 0.5;

	if (offset !== 0) {
		ctx.translate(cx, cy);
		ctx.rotate(offset);
		ctx.translate(-cx, -cy);
	}

	ctx.moveTo(cx + radiusO * Math.cos(taperAO), cy + radiusO * Math.sin(taperAO));

	for(; a <= pi2; a += angle) {

		if (toggle) {
			ctx.lineTo(cx + radiusI * Math.cos(a - taperAI), cy + radiusI * Math.sin(a - taperAI));
			ctx.lineTo(cx + radiusO * Math.cos(a + taperAO), cy + radiusO * Math.sin(a + taperAO));
		}
		else {
			ctx.lineTo(cx + radiusO * Math.cos(a - taperAO), cy + radiusO * Math.sin(a - taperAO));
			ctx.lineTo(cx + radiusI * Math.cos(a + taperAI), cy + radiusI * Math.sin(a + taperAI));
		}

		toggle = !toggle;
	}

	ctx.closePath();

	if (fill) {
		ctx.fillStyle = fill;
		ctx.fill();
	}

	if (stroke) {
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = stroke;
		ctx.stroke();
	}

	// Punch hole in gear
	if (radiusH > 0) {
		ctx.beginPath();
		ctx.globalCompositeOperation = 'destination-out';
		ctx.moveTo(cx + radiusH, cy);
		ctx.arc(cx, cy, radiusH, 0, pi2);
		ctx.closePath();

		ctx.fill();

		if (stroke) {
			ctx.globalCompositeOperation = 'source-over';
			ctx.stroke();
		}
	}

	if (drawFirst)
		dctx.drawImage(canvas, x - cx, y - cy);

	return {
		image: canvas,
		angle:	angle,
		deltaX:	cx,
		deltaY:	cy
	};
}

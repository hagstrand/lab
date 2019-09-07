/*!
 * Sphere.js JavaScript Library v0.2
 * https://github.com/SamHasler/sphere
 *
 * Copyright 2012 Samuel David Hasler
 * Released under the MIT license
 */

// Description
// -----------

// **Sphere** renders a mathematically perfect textured sphere.
// It calculates the surface of the sphere instead of approximating it with triangles.

/*
	size = width = height of the square area within the output canvas = diameter of the sphere

	functions:
		undefined()
			purpose: anonymous wrapper for the whole thing
			scope: Closure (undefined)
		createSphere()
			purpose: allows external caller to initate, loads the image, starts the drawing
			scope: global window
		undefined()
			purpose: an anonymous function set to Img:onload, executes the initial draw
			scope: ?
		calculateVector()
			purpose: Calculate vector from focus point (Origin, so can ignore) to pixel
				Calculate vector from focus point (Origin, so can ignore) to pixel
				focus point == origin, and can therefore be ignored
			scope: within Closure (undefined)
			inputs:
				h {number} = horizontal pixel = x within the square output canvas area
				v {number} = vertical pixel = y within the square output canvas area
			output: object {
				lv {number}
				lh {number}
			}
				lv and lh define the vector
				delta v?  lambda v?
		sphere()
			purpose: returns an object with one function: renderFrame()
			scope: within Closure (undefined)
		copyImageToBuffer()
			purpose: creates a hidden canvas and call drawImage() to read the texture map image into it
				called onetime by the anonymous Image:onload() method
				initializes textureImageData by calling getImageData() on the hidden canvas
			scope: within Closure (undefined)
		copyFnc()
			purpose: copy one pixel from texture to canvas (not in use, three alternative methods)
			scope: Closure (sphere)
		getVector()
			purpose: return a pixel calculated by calculateVector()
			scope: Closure (sphere)
		renderFrame()
			purpose: loop backwards through the pixels of the output canvas
				for each: 

*/

/*jshint laxcomma: true, laxbreak: true, browser: true */
(function() {

  /* 
	the following are all closure variables in an Closure (undefined)
	including functions
		calculateVector()
		sphere()
		copyImageToBuffer()

  var opts = { tilt: 40
             , turn: 20
             , fpr : 128
             };
  */

  var opts = { 
	tilt: 0,     // -90 to +90, south pole to north pole
    turn: 135
  };

  // frame count, current angle of rotation. inc/dec to turn.
  var frame_count = 10000;
  var gCanvas, gCtx;
  var gImage, gCtxImg;

  //Variable to hold the size of the canvas
  var size;

  var canvasImageData, textureImageData;

  // Number of frames for one complete rotation.
  var fpr = 800;
  
  // Constants for indexing dimentions
  var X=0, Y=1, Z=2;

  // vertical and horizontal position on canvas
  var v, h;

  var textureWidth, textureHeight;

  var hs=30;            // Horizontal scale of viewing area
  var vs=30;            // Vertical scale of viewing area

  // NB    The viewing area is an abstract rectangle in the 3d world and is not
  //    the same as the canvas used to display the image.

  var F = [0,0,0];    // Focal point of viewer
  var S = [0,30,0];    // Centre of sphere/planet

  var r=12;            // Radius of sphere/planet

  // Distance of the viewing area from the focal point. This seems
  // to give strange results if it is not equal to S[Y]. It should
  // theoreticaly be changable but hs & vs can still be used along
  // with r to change how large the sphere apears on the canvas.
  // HOWEVER, the values of hs, vs, S[Y], f & r MUST NOT BE TOO BIG
  // as this will result in overflow errors which are not traped
  // and do not stop the script but will result in incorrect
  // displaying of the texture upon the sphere.
  var f = 30;


  // There may be a solution to the above problem by finding L in
  // a slightly different way.
  // Since the problem is equivelent to finding the intersection
  // in 2D space of a line and a circle then each view area pixel
  // and associated vector can be used define a 2D plane in the 3D
  // space that 'contains' the vector S-F which is the focal point
  // to centre of the sphere.
  //
  // This is essentialy the same problem but I belive/hope it will
  // not result in the same exact solution. I have hunch that the
  // math will not result in such big numbers. Since this abstract
  // plane will be spinning, it may be posilbe to use the symetry
  // of the arangement to reuse 1/4 of the calculations.



  // Variables to hold rotations about the 3 axis
  var RX = 0,RY,RZ;
  // Temp variables to hold them whilst rendering so they won't get updated.
  var rx,ry,rz;

  var a;
  var b;
  var b2;            // b squared
  var bx=F[X]-S[X];    // = 0 for current values of F and S
  var by=F[Y]-S[Y];
  var bz=F[Z]-S[Z];    // = 0 for current values of F and S

  // c = Fx^2 + Sx^2 -2FxSx + Fy^2 + Sy^2 -2FySy + Fz^2 + Sz^2 -2FzSz - r^2
  // for current F and S this means c = Sy^2 - r^2

  var c = F[X]*F[X] + S[X]*S[X]
        + F[Y]*F[Y] + S[Y]*S[Y]
        + F[Z]*F[Z] + S[Z]*S[Z]
        - 2*(F[X]*S[X] + F[Y]*S[Y] + F[Z]*S[Z])
        - r*r
        ;

  var c4 = c*4;        // save a bit of time maybe during rendering

  var s;

  var m1 = 0;
  //double m2 = 0;

  // The following are use to calculate the vector of the current pixel to be
  // drawn from the focus position F

  var hs_ch;                // horizontal scale divided by canvas width
  var vs_cv;                // vertical scale divided by canvas height
  var hhs = 0.5*hs;    // half horizontal scale
  var hvs = 0.5*vs;    // half vertical scale

  var V = new Array(3);    // vector for storing direction of each pixel from F
  var L = new Array(3);    // Location vector from S that pixel 'hits' sphere

  var VY2=f*f;            // V[Y] ^2  NB May change if F changes

  /* createSphere() is a global function.  this == window */
  this.createSphere = function (gCanvas, textureUrl) {
    size = Math.min(gCanvas.width, gCanvas.height);
    gCtx = gCanvas.getContext("2d");
    canvasImageData = gCtx.createImageData(size, size);

    ry=90+opts.tilt;
    rz=180+opts.turn;

    RY = (90-ry);
    RZ = (180-rz);

    hs_ch = (hs / size);
    vs_cv = (vs / size);

    V[Y]=f;

    b=(2*(-f*V[Y]));
    b2=Math.pow(b,2);

    var img = new Image();
    img.onload = function() {
      copyImageToBuffer(img);
      window.earth = sphere();
      window.earth.renderFrame(new Date());
    };
    img.setAttribute("src", textureUrl);
  };

  var calculateVector = function(h,v) {
    // Calculate vector from focus point (Origin, so can ignor) to pixel
    V[X]=(hs_ch*h)-hhs;

    // V[Y] always the same as view frame doesn't mov
    V[Z]=(vs_cv*v)-hvs;

    // Vector (L) from S where m*V (m is an unknown scalar) intersects
    // surface of sphere is as follows
    //
    // <pre>
    // L = F + mV - S
    //
    //    ,-------.
    //   /         \ -----m------
    //  |     S<-L->|       <-V->F
    //   \         /
    //    `-------'
    //
    // L and m are unknown so find magnitude of vectors as the magnitude
    // of L is the radius of the sphere
    //
    // |L| = |F + mV - S| = r
    //
    // Can be rearranged to form a quadratic
    //
    // 0 = am&sup2; +bm + c
    //
    // and solved to find m, using the following formula
    //
    // <pre>
    //              ___________
    // m = ( -b &PlusMinus; \/(b&sup2;) - 4ac ) /2a
    // </pre>
    //
    // r = |F + mV - S|
    //       __________________________________________________
    // r = v(Fx + mVx -Sx)&sup2; + (Fy + mVy -Sy)&sup2; + (Fz + mVz -Sz)&sup2;
    //      
    // r&sup2; = (Fx + mVx -Sx)&sup2; + (Fy + mVy -Sy)&sup2; + (Fz + mVz -Sz)&sup2;
    //
    // r&sup2; = (Fx + mVx -Sx)&sup2; + (Fy + mVy -Sy)&sup2; + (Fz + mVz -Sz)&sup2;
    //
    // 0 = Fx&sup2; + FxVxm -FxSx + FxVxm + Vx&sup2;m&sup2; -SxVxm -SxFx -SxVxm + Sx&sup2;
    //    +Fy&sup2; + FyVym -FySy + FyVym + Vy&sup2;m&sup2; -SyVym -SyFy -SyVym + Sy&sup2;
    //    +Fz&sup2; + FzVzm -FzSz + FzVzm + Vz&sup2;m&sup2; -SzVzm -SzFz -SzVzm + Sz&sup2; - r&sup2;
    //    
    // 0 = Vx&sup2;m&sup2;          + FxVxm + FxVxm -2SxVxm    + Fx&sup2; -FxSx -SxFx + Sx&sup2;
    //    +Vy&sup2;m&sup2;          + FyVym + FyVym -2SyVym    + Fy&sup2; -FySy -SyFy + Sy&sup2;
    //    +Vz&sup2;m&sup2;          + FzVzm + FzVzm -2SzVzm    + Fz&sup2; -FzSz -SzFz + Sz&sup2; - r&sup2;
    //
    // 0 = (Vx&sup2; + Vy&sup2; + Vz&sup2;)m&sup2;  + (FxVx + FxVx -2SxVx)m    + Fx&sup2; - 2FxSx + Sx&sup2;
    //                          + (FyVy + FyVy -2SyVy)m    + Fy&sup2; - 2FySy + Sy&sup2;
    //                          + (FzVz + FzVz -2SzVz)m    + Fz&sup2; - 2FzSz + Sz&sup2; - r&sup2;
    //
    // 0 = |Vz|m&sup2;  + (FxVx + FxVx -2SxVx)m    + |F| - 2FxSx + |S|
    //             + (FyVy + FyVy -2SyVy)m          - 2FySy
    //             + (FyVy + FyVy -2SyVy)m          - 2FySy       - r&sup2;
    //
    // a = |Vz|
    // b = 
    // c = Fx&sup2; + Sx&sup2; -2FxSx + Fy&sup2; + Sy&sup2; -2FySy + Fz&sup2; + Sz&sup2; -2FzSz - r&sup2;
    // for current F and S this means c = Sy&sup2; - r&sup2;
    // </pre>

    // Where a, b and c are as in the code.
    // Only the solution for the negative square root term is needed as the
    // closest intersection is wanted. The other solution to m would give
    // the intersection of the 'back' of the sphere.

    a=V[X]*V[X]+VY2+V[Z]*V[Z];


    s=(b2-a*c4);    // the square root term

    // if s is negative then there are no solutions to m and the
    // sphere is not visible on the current pixel on the canvas
    // so only draw a pixel if the sphere is visable
    // 0 is a special case as it is the 'edge' of the sphere as there
    // is only one solution. (I have never seen it happen though)
    // of the two solutions m1 & m2 the nearest is m1, m2 being the
    // far side of the sphere.

    if (s > 0) {

      m1 = ((-b)-(Math.sqrt(s)))/(2*a);

      L[X]=m1*V[X];        //    bx+m1*V[X];
      L[Y]=by+(m1*V[Y]);
      L[Z]=m1*V[Z];        //    bz+m1*V[Z];

      // Do a couple of rotations on L

      var lx=L[X];
      var srz = Math.sin(rz);
      var crz = Math.cos(rz);
      L[X]=lx*crz-L[Y]*srz;
      L[Y]=lx*srz+L[Y]*crz;

      var lz;
      lz=L[Z];
      var sry = Math.sin(ry);
      var cry = Math.cos(ry);
      L[Z]=lz*cry-L[Y]*sry;
      L[Y]=lz*sry+L[Y]*cry;

      // Calculate the position that this location on the sphere
      // coresponds to on the texture

      var lh = textureWidth + textureWidth * (  Math.atan2(L[Y],L[X]) + Math.PI ) / (2*Math.PI);

      // %textureHeight at end to get rid of south pole bug. probaly means that one
      // pixel may be a color from the opposite pole but as long as the
      // poles are the same color this won't be noticed.

      var lv = textureWidth * Math.floor(textureHeight-1-(textureHeight*(Math.acos(L[Z]/r)/Math.PI)%textureHeight));
      return {lv:lv,lh:lh};
    }
    return null;
  };

  
  /**
   * Create the sphere function object
   */
  var sphere = function(){

    /* these are closure variables within Closure (sphere) */
    var textureData = textureImageData.data;
    var canvasData = canvasImageData.data;

	/* why is copyFnc not a closure variable? because it's never called */
    var copyFnc;

    if (canvasData.splice){
      //2012-04-19 splice on canvas data not supported in any current browser
      copyFnc = function(idxC, idxT){
        canvasData.splice(idxC, 4  , textureData[idxT + 0]
                                  , textureData[idxT + 1]
                                  , textureData[idxT + 2]
                                  , 255);
      };
    } else {
      copyFnc = function(idxC, idxT){
        canvasData[idxC + 0] = textureData[idxT + 0];
        canvasData[idxC + 1] = textureData[idxT + 1];
        canvasData[idxC + 2] = textureData[idxT + 2];
        canvasData[idxC + 3] = 255;
      };
    }
    
    var getVector = (function(){
      var cache = new Array(size*size);
      return function(pixel){
        if (cache[pixel] === undefined){
          var v = Math.floor(pixel / size);
          var h = pixel - v * size;
          cache[pixel] = calculateVector(h,v);
        }
        return cache[pixel];
      };
    })();
    
    var posDelta = textureWidth/(20*1000);
    var firstFramePos = (new Date()) * posDelta;

	/* 
		sphere() returns an object containing one function:
			renderFrame()
	*/
    return {
      renderFrame: function(time){
        // RX, RY & RZ may change part way through if the newR? (change tilt/turn) meathods are called while
        // this meathod is running so put them in temp vars at render start.
        // They also need converting from degrees to radians
        rx=RX*Math.PI/180;
        ry=RY*Math.PI/180;
        rz=RZ*Math.PI/180;
      
        // add to 24*60*60 so it will be a day before turnBy is negative and it hits the slow negative modulo bug
        var turnBy = 24*60*60 + firstFramePos - time * posDelta;
        var pixel = size*size;
      
        while(pixel--){
          var vector = getVector(pixel);
          if (vector !== null){
            //rotate texture on sphere
            var lh = Math.floor(vector.lh + turnBy) % textureWidth;
            var idxC = pixel * 4;
            var idxT = (lh + vector.lv) * 4;
      
            /* TODO light for alpha channel or alter s or l in hsl color value?
              - fn to calc distance between two points on sphere?
              - attenuate light by distance from point and rotate point separate from texture rotation
            */
      
            // Update the values of the pixel;
            canvasData[idxC + 0] = textureData[idxT + 0];
            canvasData[idxC + 1] = textureData[idxT + 1];
            canvasData[idxC + 2] = textureData[idxT + 2];
            canvasData[idxC + 3] = 255;
      
            // Slower?
            /*
            canvasImageData.data[idxC + 0] = textureImageData.data[idxT + 0];
            canvasImageData.data[idxC + 1] = textureImageData.data[idxT + 1];
            canvasImageData.data[idxC + 2] = textureImageData.data[idxT + 2];
            canvasImageData.data[idxC + 3] = 255;
            */
            // Faster?
            /* copyFnc(idxC,idxT); */
          }
        }
        gCtx.putImageData(canvasImageData, 0, 0);
      }
	};
  };  // end of function sphere()

  /* called one time after image load */
  function copyImageToBuffer(aImg) {
    gImage = document.createElement('canvas');
    textureWidth = aImg.naturalWidth;
    textureHeight = aImg.naturalHeight;
    gImage.width = textureWidth;
    gImage.height = textureHeight;

    gCtxImg = gImage.getContext("2d");
    gCtxImg.clearRect(0, 0, textureHeight, textureWidth);
    gCtxImg.drawImage(aImg, 0, 0);
    textureImageData = gCtxImg.getImageData(0, 0, textureHeight, textureWidth);

    hs_ch = (hs / size);
    vs_cv = (vs / size);
  }

}).call();

window.addEventListener('load', function(evt) {
	var texture = "earth1024x1024.jpg";
	createSphere(document.getElementById("sphere"),texture);

	window.addEventListener('keydown', function(evt) {
		switch (evt.keyCode) {
			case 38: (event.shiftKey) ? radius += 10 : lat -= .5; break;
			case 40: (event.shiftKey) ? radius -= 10 : lat += .5; break;
			case 39: lng += .5; break;
			case 37: lng -= .5; break;
			default: return;
		}
		evt.preventDefault();
		window.earth.renderFrame(new Date());
	}, false);

	window.addEventListener('click', function(evt) {
		var co = projection.invert([evt.x, evt.y]);
		var lng = co[0]
		var lat = co[1];
		console.log(lat+'N ' +lng+'E');
	}, false);
}, false);

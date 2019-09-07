/** 
	Check to see if a line intersects another 
	@return bool
*/
function lineIntersectsLine( v1, v2, v3, v4 ) {
	var denom = ((v4.y - v3.y) * (v2.x - v1.x)) - ((v4.x - v3.x) * (v2.y - v1.y));
	var numerator = ((v4.x - v3.x) * (v1.y - v3.y)) - ((v4.y - v3.y) * (v1.x - v3.x));
	
	var numerator2 = ((v2.x - v1.x) * (v1.y - v3.y)) - ((v2.y - v1.y) * (v1.x - v3.x));
	
	if ( denom == 0.0 ) {
		if ( numerator == 0.0 && numerator2 == 0.0 ) {
			return false;//COINCIDENT;
		}
		return false;// PARALLEL;
	}
	var ua = numerator / denom;
	var ub = numerator2/ denom;
	
	return (ua >= 0.0 && ua <= 1.0 && ub >= 0.0 && ub <= 1.0);
}

/**
	Test to see if a line intersects a Rectangle
	@return bool
*/
function lineIntersectsRect( v1, v2, r ) {
	var lowerLeft = {x:r.x, y:r.y+r.height};
	var upperRight = {x:r.x+r.width, y:r.y};
	var upperLeft = {x:r.x, y:r.y};
	var lowerRight = {x:r.x+r.width, y:r.y+r.height};
	
	// check if it is inside
	if (v1.x > lowerLeft.x && v1.x < upperRight.x && v1.y < lowerLeft.y && v1.y > upperRight.y &&
			v2.x > lowerLeft.x && v2.x < upperRight.x && v2.y < lowerLeft.y && v2.y > upperRight.y ) {
		return true;
	}
	
	// check each line for intersection
	if (lineIntersectsLine(v1,v2, upperLeft, lowerLeft ) ) return true;
	if (lineIntersectsLine(v1,v2, lowerLeft, lowerRight) ) return true;
	if (lineIntersectsLine(v1,v2, upperLeft, upperRight) ) return true;
	if (lineIntersectsLine(v1,v2, upperRight, lowerRight) ) return true;
	return false;
}

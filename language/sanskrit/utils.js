$ = function(s) {
	return document.getElementById(s);
}

makeEntity = function(x) {
	return '&#'+x+';';
}

appendScript = function(file) {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = file;
	document.getElementsByTagName("head")[0].appendChild(script);
}

hasClass = function(ele,cls) {
	if (!ele || !ele.className) {
		return false;
	}
	return ele.className.match(new RegExp("(\\s|^)"+cls+"(\\s|$)"));
}

addClass = function(ele,cls) {
	if (!ele) {
		return false;
	}
	if (!this.hasClass(ele,cls)) {
		ele.className+=" "+cls;
	}
}

removeClass = function(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg=new RegExp("(\\s|^)"+cls+"(\\s|$)");
		ele.className=ele.className.replace(reg," ")
	}
}

clone = function(obj) {
	var newObj={};
	for(i in obj) {
		if (obj[i]&&typeof obj[i]=="object") {
			newObj[i]=clone(obj[i]);
		}
		else {
			newObj[i]=obj[i];
		}
	}
	return newObj;
}

addEvent = function(target, functionref, tasktype) {
	if (target.addEventListener)
		target.addEventListener(tasktype, functionref, false);
	else if (target.attachEvent)
		target.attachEvent('on'+tasktype, function(){return functionref.call(target, window.event)});
}

/**
 * Pad a string. Left-fill with zeros.
 */
pad = function(s,n,bthousands) {
	s = String(s);
	n = parseInt(n) || 2;
	var t=s;
	while (t.length < n) {
		t = '0'+t;
	}
	if (bthousands && t.length > 3) {
		var i = t.length;
		t = t.substr(0,i-3) + ',' + t.substr(i-3);
	}
	return t;
}

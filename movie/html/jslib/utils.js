$ = function(s) {
	return document.getElementById(s);
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

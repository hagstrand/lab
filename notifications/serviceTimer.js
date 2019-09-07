var i = 0;

function timedCount() {
    i = i + 1;
//    postMessage(i);
	console.log('counting ' + i)
    setTimeout("timedCount()",1000);
}

timedCount();


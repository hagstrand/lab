addEventListener('load', function() {
//	drawQuizz(qKiersey);
}, false);


var drawQuizz = function(q) {
	var pat = "<div id='q%n%' class='qblock'><div id='q%n%_t'>%n%. %t%</div>%a%</div>";
	var pata = "<div id='q%n%_a%v%' class='ans'>%a%</div>";
	var s = '';
	var t = '';
	var p = '';
	var a = '';
	var test = q.test;
	for (var i=0; i<test.length; i++) {
		a = '';
		for (var j=0; j<test[i].a.length; j++) {
			t = pata;
			t = t.replaceAll('%n%', test[i].n);
			t = t.replaceAll('%a%', test[i].a[j].t);
			t = t.replaceAll('%v%', test[i].a[j].v);
			a += t;
		}
		p = pat;
		p = p.replaceAll('%n%', test[i].n);
		p = p.replaceAll('%t%', test[i].q);
		p = p.replaceAll('%a%', a);
		s += p;
	}
	
	return s;
	document.getElementById('quizz').innerHTML = s;
	document.getElementById('quizztitle').innerHTML = q.title;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

var answer = function(id) {
	var x = id;
	
	// change the style of all the other answers
	var a = id.split('_');
	var ae = document.querySelectorAll('[id='+a[0]+'] .ans');
	for (var i=0; i<ae.length; i++) {
		ae[i].classList.remove('chosen');
	}

	// change the style
	document.getElementById(id).classList.toggle('chosen');

	// store the answer

	var n = parseInt(a[0].substring(1));
	var v = parseInt(a[1].substring(1));

	//qKiersey.test[n-1].r = v;
	answers['temperament'][n] = v;
	
	// increment the total
	// re-display the progress indicator
	var cnt = countAnswers();
	var tot = qKiersey.test.length;
	document.getElementById('testprogress').max = tot;
	document.getElementById('testprogress').value = cnt;

	return;
}

var countAnswers = function() {
	var cnt = 0;
	var test = qKiersey.test;
	for (i=1; i<=test.length; i++) {
		//if (test[i].r > 0) {
		if (answers['temperament'][i] > 0) {
			cnt++;
		}
	}
	return cnt;
}
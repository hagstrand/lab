addEventListener('load', function() {
	drawQuizz(qKiersey);
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
	document.getElementById('quizz').innerHTML = s;
	document.getElementById('quizztitle').innerHTML = q.title;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

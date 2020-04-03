var mode = 's';
var tbs = '';
var tbt = '';
var tbu = '';
var tbc = '';

var buffer = [];
var syllables = [];

var comma = ',';
var hyphen = '-';

onload = function() {
	drawKeypad();
	drawKeys();

	$('modeselect').onchange = function() {
		var el = $('modeselect');
		mode = el.options[el.selectedIndex].value;
		drawKeys();
	}
	$('clear').onclick = function() {
		$('tbs').innerHTML = tbs = '';
		$('tbt').innerHTML = tbt = '';
		$('tbu').innerHTML = tbu = '';
		$('tbc').innerHTML = tbc = '';
		buffer = [];
		syllables = [];
	}
	$('copy').onclick = function() {
		var sep = '~'; 
		var cs = ',';
		var s = tbs + sep + tbc + sep + tbt + sep + sep + syllables.length;
		$('copystring').innerHTML = s;
	}
};

drawKeypad = function() {
	var wid=14;
	var ht = 5;
	var n = 1;
	var a;
	var cell = '';
	s = '<table>';
	for (i=0; i<ht; i++) {
		s += '<tr>';
		for (j=0; j<wid; j++) {
			//s += '<td id="cell_' + n + '">' + n +'</td>';
			s += '<td id="cell_' + n + '" onclick="onkey('+n+')">&nbsp;</td>';
			n++;
		}
		s += '</tr>';
	}
	s += '</table>';
	$('keypad').innerHTML = s;
}

drawKeys = function() {
	var i;
	var cell = '';
	var id = '';
	for (i in alphabet[la]) {
		a = alphabet[la][i];
		cell = '';
		if (a.b) {
			switch(mode) {
				case 's':
						cell = makeEntity(a.u);
				break;
				case 'u':
						cell = pad( a.u.toString(16),4);
				break;
				case 'k':
						cell = a.b;
				break;
				case 't':
						cell = a.t;
				break;
			}
			id = 'cell_' + a.b;
			$(id).innerHTML = cell;
		}
	}
}

onkey = function(n) {
	var a = getalpha(n);
	
	// add a character to the buffer
	buffer.push(a);
	
	// is new syllable or diacritic
	if (a.p == 'c' || a.p == 'v' || a.p == 'd') {
		syllables[syllables.length] = 1;
	}
	else if (a.p == 'a' || a.p == 'e') {
		syllables[syllables.length-1]++;
	}

	// allowed combinations:
	//   consonant-abbrev
	//   consonant-abbev-ending
	//   vowel-ending
	//   consonant-consonant-visarga
	//   vowel-consonant-visarga

	// draw the display strings
	tbu = tbs = tbt = tbc = '';
	var len = buffer.length;
	var x, xn, xp;
	var tween = false;
	for (var i=0; i<len; i++) {
		x = buffer[i];
		xn = (i<len-1) ? buffer[i+1] : null;
		tween = i > 0 && isFirstOfSyllable(i);
		
		tbu += (tbu) ? comma + x.u : x.u;

		tbs += makeEntity(x.u);

		tbt += (tween) ? hyphen : '';
		tbt += x.t;
		tbt += (x.p == 'c' && (!xn || xn.p != 'a')) ? 'a' : '';

		tbc += (tween) ? comma : '';
		tbc += makeEntity(x.u);

		xp = x;
	}

	// display the display strings
	$('tbs').innerHTML = tbs;
	$('tbt').innerHTML = tbt;
	$('tbu').innerHTML = tbu;
	$('tbc').innerHTML = tbc;
}

getalpha = function(n) {
	var a = null;
	for (i in alphabet[la]) {
		a = alphabet[la][i];
		if (a.b == n) {
			break;
		}
	}
	return a;
}

isLastOfSyllable = function(n) {
	var len = syllables.length;
	var t=0;
	var i=0;
	while (i < len) {
		t += syllables[i];
		if ((t-1) == n) {
			return true;
		}
		i++;
	}	
	return false;
}

isFirstOfSyllable = function(n) {
	var len = syllables.length;
	var t=0;
	var i=0;
	while (i < len) {
		if (t == n) {
			return true;
		}
		t += syllables[i];
		i++;
	}	
	return false;
}

/* unused */
aEOS = function(n) {
	var len = syllables.length;
	var t=0;
	var i=0;
	var aeos = [];
	while (i < len) {
		t += syllables[i];
		aeos.push(t-1);
		i++;
	}	
	return aeos;
}

/* unused */
aBOS = function(n) {
	var len = syllables.length;
	var t=0;
	var i=0;
	var abos = [];
	while (i < len) {
		abos.push(t);
		t += syllables[i];
		i++;
	}	
	return abos;
}

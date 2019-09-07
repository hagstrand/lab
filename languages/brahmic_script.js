var vowels = [];
var endings = [];
var consonants = [];
var special = [];
var digits = [];
var lng = 'sa';
mouth = {
	'g':'Guttural',
	'p':'Palatal',
	'c':'Cerebral',
	'd':'Dental',
	'l':'Labial',
	'v':'Semi-vowel',
	's':'Sibilant',
	'a':'Aspirant'
};

gConsonantKey = '';
gVowelKey = '';
gDiacriticalKey = '';
gEndingKey = '';

onload=function() {
	drawAll();
};

drawAll=function() {
	drawConsonantsChart();
	drawVowelsChart();
	drawEndingsChart();
	drawDigitsChart();
};

setLanguage = function(language) {
	lng = language;
	drawAll();
}

compose = function(e) {
	$('composebox').innerHTML = e.firstChild.innerHTML;
}

save = function() {
	$('copybox').innerHTML += $('composebox').innerHTML;
}

onConsonantClick = function(e) {
	if (gConsonantKey) {
		$('c_'+gConsonantKey).style.backgroundColor = 'white';
	}
	gConsonantKey = e.id.split('_')[1];
	e.style.backgroundColor = 'pink';
	compose(e);
}

onVowelClick = function(e) {
	if (gVowelKey) {
		$('v_'+gVowelKey).style.backgroundColor = 'white';
	}
	gVowelKey = e.id.split('_')[1];
	e.style.backgroundColor = 'pink';
}

onDiacriticalClick = function(e) {
	if (gDiacriticalKey) {
		$('d_'+gDiacriticalKey).style.backgroundColor = 'white';
	}
	gDiacriticalKey = e.id.split('_')[1];
	e.style.backgroundColor = 'pink';
	redrawConsonantsChart();
}

onEndingClick = function(e) {
	if (gEndingKey) {
		$('e_'+gEndingKey).style.backgroundColor = 'white';
	}
	gEndingKey = e.id.split('_')[1];
	e.style.backgroundColor = 'pink';
	redrawConsonantsChart();
	redrawVowelsChart();
}

onDigitClick = function(e) {
	if (gDigitKey) {
		$('e_'+gDigitKey).style.backgroundColor = 'white';
	}
	gDigitKey = e.id.split('_')[1];
	e.style.backgroundColor = 'pink';
}

redrawConsonantsChart = function() {
	for (key in consonants[lng]) {
		e = $('cc_'+key);
		if (!e) continue;
		s = makeEntity(consonants[lng][key].s);
		if (gDiacriticalKey) {
			s += makeEntity(vowels[lng][gDiacriticalKey].d);
		}
		if (gEndingKey) {
			s += makeEntity(endings[lng][gEndingKey].d);
		}
		e.innerHTML = s;
	}
}

redrawvowelsChart = function() {
	for (key in vowels[lng]) {
		e = $('v_'+key);
		if (!e) continue;
		s = makeEntity(vowels[lng][key].s);
		if (gEndingKey && endings[lng][gEndingKey].a) {
			s += makeEntity(endings[lng][gEndingKey].d);
		}
		e.innerHTML = s;
	}
}

makeEntity = function(x) {
	return '&#'+x+';';
}

drawConsonantsChart = function() {
	var s = '';
	s += '<table border=1 cellspacing=0 cellpadding=3>';
	var consonant;
	var translit;
	var pos;
	for (key in consonants[lng]) {
		c = consonants[lng][key];
		if (c.m == 'k') continue;
		if (pos != c.m) {
			pos = c.m;
			s += '</tr><tr>'
			s += "<td><div class='iso'>"+mouth[pos]+"</div></td>";
		}
		consonant = '&#'+c.s+';';
		translit = c.t;	
		id = 'c_'+key;
		idd = 'cc_'+key;
		s += "<td><div id='"+id+"' onclick='onConsonantClick(this)'><div id='"+idd+"' class='sanskrit'>"+consonant+"</div><div class='iso'>"+translit+"</div></div></td>";
	}
	s += '</tr>'
	s += '</table>';
	document.getElementById('consonants').innerHTML = s;
}

drawVowelsChart = function() {
	s = '<table border=1 cellspacing=0 cellpadding=3>';
	var a,n;
	var x;
	for (key in vowels[lng]) {
		a = vowels[lng][key];
		s += '<tr>';
		s += "<td class='iso'>"+a.t+"</td>";  // col 1

		id = 'v_'+key;
		x = (a.s == 0) ? '&nbsp;' : '&#'+a.s+';';
		s += "<td class='sanskrit' id='"+id+"' onclick='onVowelClick(this)'>"+x+"</td>";  // col 2

		id = 'd_'+key;
		x = (a.d == 0) ? '&nbsp;' : '&#'+a.d+';';
		s += "<td class='sanskrit' id='"+id+"' onclick='onDiacriticalClick(this)'>"+x+"</td>";  // col 3
		s += '</tr>';
	}
	s += '</table>';
	document.getElementById('vowels').innerHTML = s;
};

drawEndingsChart = function() {
	s = '<table border=1 cellspacing=0 cellpadding=3>';
	var n;
	for (key in endings[lng]) {
		n = endings[lng][key];
		ending = '&#'+n.d+';';
		translit = n.t;	
		id = 'e_'+key;
		s += "<tr><td><div><div class='sanskrit' id='"+id+"' onclick='onEndingClick(this)'>"+ending+"</div><div class='iso'>"+translit+"</div></div></div></td></tr>";
	}
	s += '</tr>'
	s += '</table>';
	s += '</div>'; 
	document.getElementById('endings').innerHTML = s;
}

drawDigitsChart = function() {
	s = '<table border=1 cellspacing=0 cellpadding=3>';
	var n;
	for (key in digits[lng]) {
		n = digits[lng][key];
		digit = '&#'+n.s+';';
		translit = n.t;	
		id = 'e_'+key;
		s += "<tr><td><div><div class='sanskrit' id='"+id+"' onclick='onDigitClick(this)'>"+digit+"</div><div class='iso'>"+translit+"</div></div></div></td></tr>";
	}
	s += '</tr>'
	s += '</table>';
	s += '</div>'; 
	document.getElementById('digits').innerHTML = s;
}

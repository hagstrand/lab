var vowels = [];
var endings = [];
var consonants = [];
var special = [];
var digits = [];
var lng = 'sa';
var sep = '~';
var cs = ',';
var lf = '<br/>';
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
	drawAbbreviationsChart();
	drawEndingsChart();
	drawDigitsChart();
	drawVowelEndingsChart();
	drawConsonantVowelsChart();
	drawConsonantVowelEndingsChart();
	};

makeEntity = function(x) {
	return '&#'+x+';';
}

drawConsonantsChart = function() {
	var s = '';
	var consonant;
	var translit;
	var components = '';
	for (key in consonants[lng]) {
		c = consonants[lng][key];
		if (c.m == 'k') continue;
		consonant = makeEntity(c.s);
		translit = c.t;	
		s += consonant+sep+translit+sep+components+lf;
	}
	document.getElementById('consonants').innerHTML = s;
}

drawAbbreviationsChart = function() {
	var s = '';
	var a,n;
	var x;
	var components = '';
	for (key in vowels[lng]) {
		a = vowels[lng][key];
		if (a.d) {
			x = makeEntity(a.d);
			s += x+sep+a.t+sep+components+lf;
		}
	}
	document.getElementById('vowel_abbreviations').innerHTML = s;
};

drawVowelsChart = function() {
	var s = '';
	var a,n;
	var x;
	var components = '';
	for (key in vowels[lng]) {
		a = vowels[lng][key];
		x = makeEntity(a.s);
		s += x+sep+a.t+sep+components+lf;
	}
	document.getElementById('vowels').innerHTML = s;
};

drawEndingsChart = function() {
	var s = '';
	var n;
	var components = '';
	for (key in endings[lng]) {
		n = endings[lng][key];
		ending = '&#'+n.d+';';
		translit = n.t;	
		s += ending+sep+translit+sep+components+lf;
	}
	document.getElementById('endings').innerHTML = s;
}

drawDigitsChart = function() {
	var s = '';
	var n;
	var components = '';
	for (key in digits[lng]) {
		n = digits[lng][key];
		digit = '&#'+n.s+';';
		translit = n.t;	
		s += digit+sep+translit+sep+components+lf;
	}
	document.getElementById('digits').innerHTML = s;
}

drawConsonantVowelsChart = function() {
	var s = '';
	var consonant;
	var translit;
	var abbrev,a;
	var components = '';
	for (key in consonants[lng]) {
		c = consonants[lng][key];
		if (c.m == 'k') continue;
		consonant = makeEntity(c.s);
		translit = c.t;	
 		for (keyv in vowels[lng]) {
			a = vowels[lng][keyv];
			if (!a.d) continue;
			abbrev = makeEntity(a.d);
			s += consonant+abbrev+sep+translit+a.t+sep+components+lf;
		}
	}
	document.getElementById('consonant_vowels').innerHTML = s;
}

drawVowelEndingsChart = function() {
	var s = '';
	var a,n;
	var vowel;
	var components = '';
	for (key in vowels[lng]) {
		a = vowels[lng][key];
		vowel = makeEntity(a.s);
		for (keye in endings[lng]) {
			n = endings[lng][keye];
			ending = makeEntity(n.d);
			translit = n.t;	
			s += vowel+ending+sep+a.t+translit+sep+components+lf;
		}
	}
	document.getElementById('vowel_endings').innerHTML = s;
}

drawConsonantVowelEndingsChart = function() {
	var s = '';
	var c,a,n;
	var consonant,abbrev,ending;
	var components;
	for (key in consonants[lng]) {
		c = consonants[lng][key];
		if (c.m == 'k') continue;
		consonant = makeEntity(c.s);
 		for (keyv in vowels[lng]) {
			a = vowels[lng][keyv];
			if (!a.d) continue;
			abbrev = makeEntity(a.d);
			for (keye in endings[lng]) {
				n = endings[lng][keye];
				ending = makeEntity(n.d);
				components = consonant+cs+abbrev+cs+ending;
				s += consonant+abbrev+ending+sep+c.t+a.t+n.t+sep+components+lf;
			}
		}
	}
	document.getElementById('consonant_vowel_endings').innerHTML = s;
}

var vowels = [];
var endings = [];
var consonants = [];
var special = [];
var digits = [];
var lng = 'sa';

var sep = '~';
var cs = ',';
var lf = '<br/>';

var sqlinit = '';
sqlinit += "insert into flash.quest(programid, seq, lesson, conversation, quest, answer) ";
sqlinit += "values(6, %seq%, 1, 0, '%quest%', '%answer%');";
sqlinit += lf;

var seq = 1;
var quest = '';
var translit = '';  // answer = transliteration, meaning, audio file, visual file
//var components = '';
//var complexity = '';

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
	eraseHeadings();
};

drawAll=function() {
	drawDigitsChart();
	drawVowelsChart();
	drawAbbreviationsChart();
	drawEndingsChart();
	drawConsonantsChart();
	drawVowelEndingsChart();
	drawConsonantVowelsChart();
	drawConsonantVowelEndingsChart();
	};

eraseHeadings = function() {
	document.getElementById('hdigits').innerHTML = '';
	document.getElementById('hvowels').innerHTML = '';
	document.getElementById('hvowel_abbreviations').innerHTML = '';
	document.getElementById('hendings').innerHTML = '';
	document.getElementById('hconsonants').innerHTML = '';
	document.getElementById('hvowel_endings').innerHTML = '';
	document.getElementById('hconsonant_vowels').innerHTML = '';
	document.getElementById('hconsonant_vowel_endings').innerHTML = '';
}

makeEntity = function(x) {
	return '&#'+x+';';
}

composeSql = function() {
	var sql = sqlinit;
	sql = sql.replace('%seq%', seq++);
	sql = sql.replace('%quest%', quest);
	sql = sql.replace('%answer%', translit);
	return sql;
}

drawDigitsChart = function() {
	var s = '';
	var n;
	var components = '';
	for (key in digits[lng]) {
		n = digits[lng][key];
		quest = makeEntity(n.s);
		translit = n.t;	
		s += composeSql();
	}
	document.getElementById('digits').innerHTML = s;
}

drawVowelsChart = function() {
	var s = '';
	var a,n;
	var x;
	var components = '';
	for (key in vowels[lng]) {
		a = vowels[lng][key];
		quest = makeEntity(a.s);
		translit = a.t;
		s += composeSql();
	}
	document.getElementById('vowels').innerHTML = s;
};

drawAbbreviationsChart = function() {
	var s = '';
	var a;
	for (key in vowels[lng]) {
		a = vowels[lng][key];
		if (a.d) {
			quest = makeEntity(a.d);
			translit = a.t;
			s += composeSql();
		}
	}
	document.getElementById('vowel_abbreviations').innerHTML = s;
};

drawEndingsChart = function() {
	var s = '';
	var n;
	var components = '';
	for (key in endings[lng]) {
		n = endings[lng][key];
		quest = makeEntity(n.d);
		translit = n.t;	
		s += composeSql();
	}
	document.getElementById('endings').innerHTML = s;
}

drawConsonantsChart = function() {
	var s = '';
	var components = '';
	for (key in consonants[lng]) {
		c = consonants[lng][key];
		if (c.m == 'k') continue;
		quest = makeEntity(c.s);
		translit = c.t;
		s += composeSql();
	}
	document.getElementById('consonants').innerHTML = s;
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
			quest = vowel+ending;
			translit = a.t + n.t;
			s += composeSql();
		}
	}
	document.getElementById('vowel_endings').innerHTML = s;
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
 		for (keyv in vowels[lng]) {
			a = vowels[lng][keyv];
			if (!a.d) continue;
			abbrev = makeEntity(a.d);
			quest = consonant+abbrev;
			translit = c.t+a.t;
			s += composeSql();
		}
	}
	document.getElementById('consonant_vowels').innerHTML = s;
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
				quest = consonant+abbrev+ending;
				translit = c.t+a.t+n.t;
				s += composeSql();
			}
		}
	}
	document.getElementById('consonant_vowel_endings').innerHTML = s;
}

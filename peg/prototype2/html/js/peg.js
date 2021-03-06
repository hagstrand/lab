/*
class Peg
singleton

A pie shows a distribution of scores within oneself.
A guage shows a score compared to others.

A pie shows two or more scores simultaneously.

A spread shows two scores relative to each other.

A 1-pole factor shows a single score.
A 2-pole factor implies the existence of a second paired factor.
A 3+pole factor is a composite of n other primary factors.

A global factor has 2 or more composite factors.
A global factor can be a 1-pole, averaging the scores of the composite factors.
A global factor can be a m-pole, showing the composite scores on a pie chart.

test - string id
tst - object in peg.tests

factor - string id
fact - object in peg.factors

pageid - string test-factor or test-all or all-all
*/
function Peg() {
}

/**
	method drawPage()
	Called on nav by BrowserClass,
	on startup, on back and forward, and on every user navigation click.
	Draws the page using composeXXX() methods, each of which returns a string of HTML.
**/
Peg.prototype.drawPage = function(pageid) {
	var pageid = pageid || 'home';
	var s = '';
	if (pageid == 'home') {  // main refrigerator-magnet summary page
		s = this.composeHome();
	}
	else if (pageid == 'qkiersey') {   // quizz
		s = this.composeTest(pageid);
	}
	else if (pageid == 'gifts' || pageid == 'nourishments' || pageid == 'burnouts') {
		s = this.composeGifts(pageid);
	}
	else {
		s = this.composeFactor(pageid);
	}

	document.title = 'PEG ' + pageid;
	document.getElementById('dcontent').innerHTML = s;
	this.attachHandlers();
	window.dispatchEvent(new Event('resize'));
	window.scroll(0,0);
	return;
}

/*
	following are the composeXXX() methods, which all return a string of HTML
*/

/*
	method composeHome()
	draw the home page, a refrigerator-magnet-like summary screen
*/
Peg.prototype.composeHome = function(test, factors) {
	var s = "<h1>My Authentic Self</h3>";
	s += "<panel id='temperament' class='panel red'><h3>My Temperament</h3>";
	s += "<p>";
	s += "<chart factor='temperament-extravert'></chart>";
	s += "<chart factor='temperament-sensible'></chart><br/>";
	s += "<chart factor='temperament-thinking'></chart>";
	s += "<chart factor='temperament-judicious'></chart>";
	s += "<br/><button class='anchor' test='qkiersey'>Take the test</button>";
	s += "</p></panel>";

	s += "<panel id='motivation' class='panel red'><h3>My Motivation</h3>";
	s += "<p>";
	s += "<chart factor='motivation-adventure'></chart>";
	s += "<chart factor='motivation-personal'></chart>";
	s += "<br/><button class='anchor'>Take the test</button>";
	s += "</p></panel>";

	s += "<panel class='panel red'><h3>My Learning Style</h3>";
	s += "<p>";
	s += "<img src='mockup/vak.jpg' nav='burnouts'/>";
	s += "<br/><button class='anchor'>Take the test</button>";
	s += "</p></panel>";

	s += "<panel class='panel red'><h3>My Personality</h3>";
	s += "<p>";
	s += "<chart factor='personality-extraversion'></chart>";
	s += "<chart factor='personality-anxiety'></chart>";
	s += "<chart factor='personality-tough'></chart><br/>";
	s += "<chart factor='personality-independence'></chart>";
	s += "<chart factor='personality-selfcontrol'></chart>";
	s += "<br/><button class='anchor'>Take the test</button>";
	s += "</p></panel>";

	s += "<panel class='panel red'><h3>My Emotional Intelligence</h3>";
	s += "<p>";
	s += "<chart factor='eji-summary'></chart>";
	s += "<br/><button class='anchor'>Take the test</button>";
	s += "</p></panel>";

	s += "<panel class='panel red'><h3>Structure of My Intellect</h3>";
	s += "<p>";
	s += "<chart factor='soi-figural'></chart>";
	s += "<chart factor='soi-symbolic'></chart><br/>";
	s += "<chart factor='soi-semantic'></chart>";
	s += "<br/><button class='anchor'>Take the test</button>";
	s += "</p></panel>";

	s += "<panel class='panel red'><h3>My Gifts</h3>";
	s += "<p>";
	s += "<img src='i/gift.jpg' nav='gifts'/>";
	s += "</p></panel>";

	s += "<panel class='panel red'><h3>My Nourishments</h3>";
	s += "<p>";
	s += "<img src='i/nourishment.jpg' nav='nourishments'/>";
	s += "</p></panel>";

	s += "<panel class='panel red'><h3>My Burnouts</h3>";
	s += "<p>";
	s += "<img src='i/burnout.jpg' nav='burnouts'/>";
	s += "</p></panel>";

	s += "<p><button class='anchor' nav='all-all'>Print all details</button></p>";

	return s;
}

/*
	method composePanel()
	A panel is a set of graphs in a box.
*/
Peg.prototype.composePanel = function(test, factors) {
	var s = '';
	s += "<panel class='panel red'><h3></h3>";
	s += "<p>";
	var fact = {};
	for (var i=0; i<factors.length; i++) {
		fact = peg.factors[test][factors[i]]; 
		s += "<chart factor='" + fact.test + "-" + fact.factor + "'></chart>";
	}
	s += "</p></panel>";
	return s;
}

Peg.prototype.composeFactor = function(pageid) {
	var a = pageid.split('-');
	var test = a[0];
	var factor = a[1];
	var s = '';
	if (test == 'all') {
		s += this.composeAllAll();
	}
	else if (factor == 'all') {
		s += this.composeTestAll(test,factor);
	}
	else {
		s += this.composeTestFactor(test,factor);
	}
	return s;
}

Peg.prototype.composeTestFactor = function(test,factor) {
	var pageid = test + '-' + factor;
	var s = '';
	s += "<p><button class='anchor' nav='home'>Return to main page</button></p>";
	s += "<h1>" + this.getTestTitle(test, factor) + "</h1>";
	s += "<div class='narrative'>";
	s += this.composeFactorStory(test, factor, true);
	s += "</div>";
	s += "<p><button class='anchor' nav='" + this.getPageId(test, 'all') + "'>Show all " + this.getTestTitle(test, factor) + " Details</button></p>";
	return s;
}

Peg.prototype.composeFactorStory = function(test, factor, showComponents) {
	var s = '';
	var pageid = test + '-' + factor;
	s += "<h2><headline factor='" + pageid + "'>" + this.composeHeadline(test, factor) + "</headline></h2>";
	s += "<chart factor='" + pageid + "'></chart>";
	s += "<story factor='" + pageid + "'>" + this.composeStory(test, factor, showComponents) + "</story>";
	return s;
}

Peg.prototype.composeTestAll = function(pageid) {
	var a = pageid.split('-');
	var test = a[0];
	var factor = a[1];  // 'all'
	var s = "";
	s += "<div class='narrative'>";
	s += "<h1>" + this.getTestTitle(test, factor) + "</h1>";
	if (!factor) {
		for (var k in peg.factors[test]) {
			s += this.composeFactorStory(test, k, false);
		}
	}
	s += "</div>";
	return s;
}

Peg.prototype.composeAllAll = function() {
	var s = '';
	for (var test in peg.tests) {
		s += "<h1>" + peg.tests[test].display + "</h1>";
		for (var k in peg.factors[test]) {
			s += this.composeFactorStory(test, k, false);
		}
	}
	return s;
}

Peg.prototype.composeStory = function(test, factor, showComponents) {
	var fact = peg.factors[test][factor];
	
	var score = peg.scores.get(test, factor);
		
	// determine range: low, high, medium
	var range = '';
	var low = 35;
	var high = 65;
	if (score.pct < low)
		range = 'low';
	else if (score.pct > high)
		range = 'high';
	else {
		range = 'medium';
	}

	var sGift = '';
	var sNourishment = '';
	var sBurnout = '';
	
	// compose gift section
	var gift;
	for (var j=0; j<peg.gifts.length; j++) {
		gift = peg.gifts[j];
		
		if (gift.test == test && gift.factor == factor && gift.range == range) {
			sGift += '<p><span class="gift">Gift:</span> ' + gift.narrative + '</p>';
		}
	}

	// compose nourishment section
	for (var j=0; j<peg.nourishments.length; j++) {
		gift = peg.nourishments[j];
		if (gift.test == test && gift.factor == factor && gift.range == range) {
			sNourishment += '<p><span class="nourishment">Nourishment:</span> ' + gift.narrative + '</p>';
		}
	}

	// compose burnout section
	for (var j=0; j<peg.burnouts.length; j++) {
		gift = peg.burnouts[j];
		if (gift.test == test && gift.factor == factor && gift.range == range) {
			sBurnout += '<p><span class="burnout">Burnout:</span> ' + gift.narrative + '</p>';
		}
	}

	var s = sGift + sNourishment + sBurnout;
	//s += '<p><textarea>enter personal notes here</textarea></p>';
	s += '<p><textarea placeholder="enter personal notes here"></textarea></p>';

	if (fact.global && showComponents) {
		s += '<p>This is a composite factor made up of the following component factors.</p>'
		s += voyc.peg.composePanel(test, fact.components);
	}
	
	s = this.changePerson(s);
	return s;
}

Peg.prototype.composeHeadline = function(test, factor, score) {
	var fact = peg.factors[test][factor];
	
	var score = peg.scores.get(test, factor);
		
	var range = this.getRange(test, factor, score);

	// reverse range for paired factors
	var displayrange = range;
	var factorhigh = fact.left;
	var factorlow = fact.right;
	var pcthigh = score.pct;
	var pctlow = 100 - score.pct;

	//if (peg.tests[test].dimensions == 'paired') {
	if (voyc.peg.getPole(fact) == 2) {
		if (range == 'medium') {
			displayrange = 'balanced';
		}
		else if (range == 'low') {
			displayrange = 'high';
			factorhigh = fact.right;
			factorlow = fact.left;
			pcthigh = 100 - score.pct;
			pctlow = score.pct;
		}
	}
	
	var drange = peg.strings[displayrange];
	var dname = factorhigh;
	if (displayrange == 'balanced') {
		dname = fact.left + ' and ' + fact.right;
	}
	s = peg.strings[displayrange] + ' ' + dname;
	return s;
}

Peg.prototype.composeTest = function(pageid) {
	var s = '';
	s += "<div class='qcontainer narrative'>";
	
	// fixed header
	s += "<div class='qheader'>";
	s += "<p><button class='anchor' nav='home'>Return to main page</button></p>";
	//s += "<h1><headline factor='" + pageid + "' class='h3'></headline></h1>";
	s += "<h1><headline factor='" + pageid + "' class='h3'>temperament Temperament Sorter II</headline></h1>";
	s += "<p><button class='anchor' nav='home'>Instructions</button></p>";
	s += "<progress id='testprogress' max=70 value=10></progress>";
	s += "<div>Copyright</div>";
	s += "</div>";
	
	// scrolling quizz area
	s += "<div class='qscroller'>";
	s += drawQuizz(qKiersey);
	s += "</div>";
	
	// fixed footer
	/*
	s += "<div class='qfooter'>";
	s += "<p><button class='anchor' nav='home'>Instructions</button></p>";
	s += "<progress id='testprogress' max=70 value=10></progress>";
	s += "<div>Copyright</div>";
	s += "</div>";
	*/
	return s;
}

Peg.prototype.composeGifts = function(which) {
	var s = '';

	// loop through scores
	var score, test, factor, range;
	for (var i=0; i<peg.scores.scores.length; i++) {
		score = peg.scores.scores[i];
		test = peg.tests[score.testid];
		factor = peg.factors[score.testid][score.factorid];
		
		// determine range: low, high, average
		var range = '';
		var low = 35;
		var high = 65;
		if (score.pct < low)
			range = 'low';
		else if (score.pct > high)
			range = 'high';
		else {
			range = 'average';
		}

		// compose gift section
		var gift, navid, linkdisplay;
		if (which == 'gifts') {
			for (var j=0; j<peg.gifts.length; j++) {
				gift = peg.gifts[j];
				
				if (gift.test == factor.test && gift.factor == factor.factor && gift.range == range) {
					navid = gift.test + '-' + gift.factor;
					linkdisplay = peg.tests[gift.test].display + ' - ' + peg.factors[gift.test][gift.factor].left;
					s += "<p>" + gift.narrative + " <button class=anchor nav='" + navid + "'>" + linkdisplay + "</button></p>";
				}
			}
		}

		// compose nourishment section
		if (which == 'nourishments') {
			for (var j=0; j<peg.nourishments.length; j++) {
				gift = peg.nourishments[j];
				if (gift.test == factor.test && gift.factor == factor.factor && gift.range == range) {
					navid = gift.test + '-' + gift.factor;
					linkdisplay = peg.tests[gift.test].display + ' - ' + peg.factors[gift.test][gift.factor].left;
					s += "<p>" + gift.narrative + " <button class=anchor nav='" + navid + "'>" + linkdisplay + "</button></p>";
				}
			}
		}

		// compose burnout section
		if (which == 'burnouts') {
			for (var j=0; j<peg.burnouts.length; j++) {
				gift = peg.burnouts[j];
				if (gift.test == factor.test && gift.factor == factor.factor && gift.range == range) {
					navid = gift.test + '-' + gift.factor;
					linkdisplay = peg.tests[gift.test].display + ' - ' + peg.factors[gift.test][gift.factor].left;
					s += "<p>" + gift.narrative + " <button class=anchor nav='" + navid + "'>" + linkdisplay + "</button></p>";
				}
			}
		}
	}

	if (which == 'gifts') {
		s = "<h2>My Gifts</h2><container>" + s + "</container>";
	}
	if (which == 'nourishments') {
		s = "<h2>My Nourishments</h2><container>" + s + "</container>";
	}
	if (which == 'burnouts') {
		s = "<h2>My Burnouts</h2><container>" + s + "</container>";
	}

	return s;
}

/**
	Populate HTML after it has been rendered.
**/
Peg.prototype.attachHandlers = function() {
	//attachAllCharts = function() {
	var charts = document.querySelectorAll('chart');
	for (var i=0; i<charts.length; i++) {
		charts[i].addEventListener('click', function(e) {
			(new voyc.BrowserHistory).nav(e.currentTarget.getAttribute('factor'));
		}, false);
	}
	
	// attach click handlers
	var navs = document.querySelectorAll('[nav]');
	for (var i=0; i<navs.length; i++) {
		navs[i].addEventListener('click', function(e) {
			(new voyc.BrowserHistory).nav(e.currentTarget.getAttribute('nav'));
		}, false);
	}

	var tests = document.querySelectorAll('[test]');
	for (var i=0; i<tests.length; i++) {
		tests[i].addEventListener('click', function(e) {
			(new voyc.BrowserHistory).nav(e.currentTarget.getAttribute('test'));
		}, false);
	}

	var ae = document.querySelectorAll('div.ans');
	for (var i=0; i<ae.length; i++) {
		ae[i].addEventListener('click', function(e) {
			answer(e.currentTarget.id);
		}, false);
	}
}

/**
	method populateHTML()
	called on window resize event
	redraws variable sized elements
**/
Peg.prototype.populateHTML = function() {
	var charts = document.querySelectorAll('chart');
	for (var i=0; i<charts.length; i++) {
		this.populateChart(charts[i]);
	}
}

Peg.prototype.populateChart = function(elem) {
	var c1 = 'RGB(0,255,255)';
	var c2 = 'RGB(255,255,0)';

	var a = elem.getAttribute('factor').split('-');
	var test = a[0];
	var factor = a[1];
	var fact = peg.factors[test][factor];
	var tst = peg.tests[test];

	if (voyc.peg.getPole(fact) == 1) {
		var scoreleft = peg.scores.get(test, factor).pct;
		var	labelleft = fact.aleft || fact.left;
		var w = elem.offsetWidth;
		if (w > 400) {
			//labelleft = fact.left + ' (' + voyc.pct(scoreleft,tst.maxscore) + '%)';
			labelleft = fact.left + ' (' + scoreleft + '%)';
		}

		var data = [];
		data[0] = {
			l:labelleft,
			c:0,
			p:scoreleft
		};

		drawgauge(elem, data);
	}
	else if (voyc.peg.getPole(fact) == 2) {
		var scoreleft = peg.scores.get(test, factor).raw;
		var scoreright = peg.tests[test].maxscore - scoreleft;
		
		var labelleft = fact.aleft || fact.left;
		var labelright = fact.aright || fact.right;
		var w = elem.offsetWidth;
		if (w > 400) {
			labelleft = fact.left + ' (' + voyc.pct(scoreleft,10) + '%)';
			labelright = fact.right + ' (' + voyc.pct(scoreright,10) + '%)';
		}

		var data = [];
		data[0] = {
			l:labelleft,
			c:c1,
			p:scoreleft
		};
		data[1] = {
			l:labelright,
			c:c2,
			p:scoreright
		};

		drawpie(elem, data);
	}
}

/**
	utilities
**/
voyc.pct = function(n,max) {
	return parseInt((n / max) * 100);
}

Peg.prototype.getPole = function(factor) {
	var n = factor.pole || peg.tests[factor.test].pole;
	return n;
}

Peg.prototype.getRange = function(test, factor, score) {
	// determine range: low, high, medium
	var range = '';
	var low = 35;
	var high = 65;
	if (score.pct < low)
		range = 'low';
	else if (score.pct > high)
		range = 'high';
	else {
		range = 'medium';
	}
	return range;
}

/**
	getPageid(test,factor)
	getPageTitle(test,factor)
	
	Examples:
		pageid                  pagetitle
		temperament-all         Temperament All
		temperament-extravert   Temperament Extravert
**/
Peg.prototype.getPageId = function(test, factor) {
	return test + '-' + factor;
}

Peg.prototype.getPageTitle = function(test, factor) {
	return peg.tests[test].display + '-' + peg.factors[factor].left;
}

Peg.prototype.getTestTitle = function(test, factor) {
	return peg.tests[test].display;
}

Peg.prototype.changePerson = function(s) {
	var t = s;
	t = t.replace(/your/g, 'my');
	t = t.replace(/Your/g, 'My');
	t = t.replace(/yours/g, 'mine');
	t = t.replace(/You are/g, 'I am');
	t = t.replace(/You were/g, 'I was');
	t = t.replace(/you were/g, 'I was');
	t = t.replace(/You/g, 'I');
	t = t.replace(/you/g, 'I');
	return t;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/**
	window handlers
**/
window.addEventListener('load', function() {
	// one-time create global singleton
	voyc.peg = new Peg();
	peg.scores = new Scores();
	peg.scores.read('joe');

	// ?
	var elems = document.querySelectorAll('[name=sampleuser]');
	for (var i=0; i<elems.length; i++) {
		var elem = elems[i];
		elem.addEventListener('click', function(evt) {
			evt.currentTarget.blur();
			peg.scores.read(evt.currentTarget.getAttribute('id'));
			voyc.peg.drawPage('home');
		}, false);
	}

	// set drawPage function as the callback in BrowserHistory object
	new voyc.BrowserHistory('name', function(pageid) {
		voyc.peg.drawPage(pageid);
	});

}, false);

window.addEventListener('resize', function() {
	voyc.peg.populateHTML();
}, false);


// options loaded dynamically per user along with scores
peg.options = {
	showscores: 0,
	showgifts: 0,
	orderby: 'test',  // test, significance
	format: 'circle',  // tests, gifts, circle
	graphdraw: 'vendor'  // vendor, paired, offcenter
}

draw = function() {
	peg.scores.reorder();
	
	if (peg.options.format == 'circle') {
		return drawCircle();
	}
	else if (peg.options.format == 'gifts') {
		return drawByGifts();
	}
	else { // peg.options.format == 'tests'
		return drawByTests();
	}
}

/**
	Draw the circle chart, like this:
	http://www.nature.com/nature/journal/v491/n7424/carousel/nature11631-f2.2.jpg
**/

var factors = [
	{num:1, name:'Adventure', score:80},
	{num:2, name:'Introvert', score:20},
	{num:3, name:'Public Recognition', score:95},
	{num:4, name:'Squeamishness', score:05},
]

drawCircle = function() {
	// create a canvas covering the full screen
	var content = document.getElementById('content');
	content.classList.remove('narrative');
	var canvas = document.createElement('canvas');
	content.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - parseInt(window.getComputedStyle(content).paddingTop) - 6;
	var ctx = canvas.getContext("2d");
	var ctr = {x:canvas.width/2, y:canvas.height/2};
	var r = Math.min(ctr.x, ctr.y);
	var rMax = r;
	rRing = r * .80;
	var r00 = r * .78;
	var r20 = r * .644;
	var r40 = r * .508;
	var r60 = r * .372;
	var r80 = r * .236;
	var r100 = r * .10;
	var rOutside = r00;
	var rInside = r100;

	var cRing = 'black';
	var c1 = '#ccc';
	var c2 = 'white';

//	drawRing(ctx, ctr, rMax, cRing);
	drawRing(ctx, ctr, rRing, cRing);
	drawRing(ctx, ctr, r00, c1);
	drawRing(ctx, ctr, r20, c2);
	drawRing(ctx, ctr, r40, c1);
	drawRing(ctx, ctr, r60, c2);
	drawRing(ctx, ctr, r80, c1);
	drawRing(ctx, ctr, r100, c2);

	ctx.rect(0,0,200,100);
	ctx.stroke();

	ctx.translate(ctr.x, ctr.y);
	ctx.rotate(20*Math.PI/180);

	ctx.rect(0,0,200,100);
	ctx.stroke();

	//drawRay(ctx, ctr, rOutside, rInside, 75, 1);
	//drawRay(ctx, ctr, rOutside, rInside, 25, 2);
	//drawRay(ctx, ctr, rOutside, rInside, 95, 3);
	//drawRay(ctx, ctr, rOutside, rInside,  5, 4);

	for (var i=0; i<factors.length; i++) {
		var factor = factors[i];
		drawRay(ctx, ctr, rOutside, rInside,  factor.score, factor.num, factor.name);
	}

}

drawRing = function(ctx, ctr, r, styleFill) {
	ctx.fillStyle = styleFill;
	ctx.beginPath();
	ctx.arc(ctr.x, ctr.y, r, 0*Math.PI,2*Math.PI,false);
	ctx.fill();
}

drawRay = function(ctx, ctr, rOutside, rInside, score, factorNum, name) {
	// score is a percentage from 0 to 100
	var x = rOutside - rInside;
	var pct = (100 - score) / 100;
	var rIn = rInside + (x * pct);
	
	var fn = factorNum - 1;

	ctx.fillStyle = 'blue';
	if (score < 50)
		ctx.fillStyle = 'red';
	var raywidth = .013;

	ctx.save();
	ctx.beginPath();
	ctx.arc(0,0, rOutside, 0*Math.PI, 2*Math.PI, false);
	ctx.arc(0,0, rIn , 2*Math.PI, 0*Math.PI, true);
	ctx.clip();

	ctx.beginPath();
	ctx.moveTo(0,0);
	var angle = (fn+1)*raywidth*Math.PI;
	ctx.arc(0,0, rOutside, fn*raywidth*Math.PI, (fn+1)*raywidth*Math.PI, false);
	ctx.lineTo(0,0);
	ctx.fill();
	ctx.restore();
	
	ctx.beginPath();
	var beg = {x:0, y:0};
	var end = {x:0, y:0};
	beg.x = parseInt(rOutside);
	beg.y = 0;
	end.x = 0 + rRing*Math.cos(angle);
	end.y = 0 + rRing*Math.sin(angle);
	//ctx.rect(beg.x, beg.y, 200,100);
	ctx.rect(end.x, end.y, 200,100);

	ctx.strokeStyle = 'yellow';
	ctx.stroke();
	
	ctx.fillText(name, end.x, end.y);
	
	//http://stackoverflow.com/questions/3671611/how-do-i-get-the-x-y-coordinates-of-the-first-and-last-points-of-the-drawn-arc-r
	//	How do i get the x/y coordinates of the first and last points of the drawn arc relative to the top left corner of the canvas?
	//The starting point is trivially (x + radius, y). The ending point is, by simple trigonometrics, (x + radius*cos(angle), y + radius*sin(angle)). Note that the starting point in this case is a special case of the more general ending point, with angle equal to zero. These values also need to be rounded to the nearest integer, for obvious reasons.
	
}

drawByTests = function() {
	var factor;
	var s = '';
	var ts;

	if (peg.options.orderby == 'test') {
		for (var key in peg.factors) {
			tests = peg.factors[key];
			var sTitle = '<h2>' + peg.tests[key].display + '</h2>';
			s += sTitle;
			s += '<container>';
			for (var key in tests) {
				factor = tests[key];
				ts = drawBar(factor);
				s += ts;
			}
			s += '</container>';
		}
	}
	else { // if peg.options.orderby == 'significance'
		var score,test,factor,ts;
		var bh2 = false;

		s += '<h2>' + 'Significant Tendancies' + '</h2><container>';

		// loop through scores
		for (var i=0; i<peg.scores.scores.length; i++) {
			score = peg.scores.scores[i];
			if (!bh2 && score.offset < 25) {
				s += '</container><h2>' + 'Balanced Qualities' + '</h2><container>';
				bh2 = true;
			}
			test = peg.tests[score.testid];
			factor = peg.factors[score.testid][score.factorid];
			ts = drawBar(factor);
			s += ts;
		}

		s += '</container>';
	}

	$('content').innerHTML = s;

	//removeSubs(factor);
	attachAllGraphs();

	// display scores
	for (var key in peg.factors) {
		tests = peg.factors[key];
		for (var key in tests) {
			factor = tests[key];
			displayScore(factor);
			attachHandlers(factor);
		}
	}

	recalcDerived();
	showScores(peg.options.showscores);
	showGifts(peg.options.showgifts);
	drawAllGraphs();
}

drawByGifts = function() {
	var s = '<h2>Gifts</h2><container id="giftlist"></container>';
	s += '<h2>Nourishments</h2><container id="nourishmentlist"></container>';
	s += '<h2>Burnouts</h2><container id="burnoutlist"></container>';
	$('content').innerHTML = s;

	var sGift = '';
	var sNourishment = '';
	var sBurnout = '';

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
		var gift;
		for (var j=0; j<peg.gifts.length; j++) {
			gift = peg.gifts[j];
			
			if (gift.test == factor.test && gift.factor == factor.factor && gift.range == range) {
				var ref = ''; //' <i>[' + peg.tests[gift.test].display + ': ' + range + ' ' + factor.left + ' (' + score.raw + ')]</i>';
				sGift += '<p>' + gift.narrative + ref + '</p>';
			}
		}

		// compose nourishment section
		for (var j=0; j<peg.nourishments.length; j++) {
			gift = peg.nourishments[j];
			if (gift.test == factor.test && gift.factor == factor.factor && gift.range == range) {
				sNourishment += '<p>' + gift.narrative + '</p>';
			}
		}

		// compose burnout section
		for (var j=0; j<peg.burnouts.length; j++) {
			gift = peg.burnouts[j];
			if (gift.test == factor.test && gift.factor == factor.factor && gift.range == range) {
				sBurnout += '<p>' + gift.narrative + '</p>';
			}
		}
	}

	document.getElementById('giftlist').innerHTML = sGift;
	document.getElementById('nourishmentlist').innerHTML = sNourishment;
	document.getElementById('burnoutlist').innerHTML = sBurnout;
}

drawBar = function(factor) {
	var sbar = "<chapter id='%test%-%factor%'><h3>Chapter Title</h3><bar class='%class%'><factor>%left%<subfactor>%leftsub%</subfactor></factor><score><input value='5'/></score><slider><graph value='' min='' max='' draw='' ></graph></slider><score class='right'><input value='5'/></score><factor class='right'>%right%<subfactor>%rightsub%</subfactor></factor></bar><gifts></gifts></chapter>";
	sbar = sbar.replace('%test%', factor.test);
	sbar = sbar.replace('%factor%', factor.factor);
	sbar = sbar.replace('%left%', factor.left);
	sbar = sbar.replace('%right%', factor.right);
	sbar = sbar.replace('%leftsub%', factor.leftsub);
	sbar = sbar.replace('%rightsub%', factor.rightsub);
	sbar = sbar.replace('%class%', peg.tests[factor.test].vendorstyle);

	if (!peg.tests[factor.test].hassubs) {
		sbar = sbar.replace(/\<subfactor\>.*?\<\/subfactor\>/g, '');
	}
	if (peg.tests[factor.test].dimensions == 'single') {
		sbar = sbar.replace(/\<factor class\=\'right\'\>.*?\<\/factor\>/g, '');
	}
	if (!peg.tests[factor.test].pairedscore) {
		sbar = sbar.replace(/\<score class\=\'right\'\>.*?\<\/score\>/g, '');
	}

	return sbar;
}

displayScore = function(factor) {
	var scoreleft = peg.scores.get(factor.test, factor.factor).raw;
	var scoreright = peg.tests[factor.test].maxscore - scoreleft;

	var inputleft = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] bar score:nth-of-type(1) input' );
	var inputslider = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] bar graph' );
	var inputright = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] bar score:nth-of-type(2) input' );

	inputleft.value = scoreleft;
	if (inputslider) {
		inputslider.setAttribute('value', scoreleft);
	}

	if (inputright) {
		inputright.value = scoreright;
	}

	drawGiftsSection(factor);
}

attachHandlers = function(factor) {
	var inputleft = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] bar score:nth-of-type(1) input' );
	var inputslider = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] bar slider input' );
	var inputright = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] bar score:nth-of-type(2) input' );

	inputleft.addEventListener('change', function(evt) {
		onScoreChanged(evt);
	}, false);

	if (inputslider) {
		inputslider.addEventListener('change', function(evt) {
			onScoreChanged(evt);
		}, false);
	}

	if (inputright) {
		inputright.addEventListener('change', function(evt) {
			onScoreChanged(evt);
		}, false);
	}
}

removeSubs = function(factor) {
	var subs = document.querySelectorAll('subfactor' );
	if (subs) {
		var elem;
		for (var i=0; i<subs.length; i++) {
			elem = subs[i];
			var r = findParentChapter(elem);
			var factor = peg.factors[r.testname][r.factorname];
			var test = peg.tests[r.testname];
			if (!test.hassubs) {
				elem.parentNode.removeChild(elem);
			}
		}
	}
}

findParentChapter = function(elem) {
	// get parent chapter element
	var id = 'starting';
	for ( var e=elem; e && e !== document; e = e.parentNode ) {
		if (e.tagName.toLowerCase() == 'chapter') {
			id = e.id;
		}
	}

	// return test and factor names split from id
	if (!id) return false;
	return {
		testname: id.split('-')[0],
		factorname: id.split('-')[1]
	};
}

onScoreChanged = function(evt) {
	var elem = evt.target;

	// get new value from user
	var newValue = Number(elem.value);

	var r = findParentChapter(elem);
	var factor = peg.factors[r.testname][r.factorname];
	var test = peg.tests[r.testname];

	// calc new value for paired factor
	var pairedValue = test.maxscore - newValue;

	// change score values in onscreen controls
	var inputleft = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] score:nth-of-type(1) input' );
	var inputslider = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] slider graph' );
	var inputright = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] score:nth-of-type(2) input' );
	if (elem == inputleft) {
		inputslider.setAttribute('value', newValue);
		if (inputright) {
			inputright.value = pairedValue;
		}
	}
	if (elem == inputslider) {
		inputleft.value = newValue;
		if (inputright) {
			inputright.value = pairedValue;
		}
	}
	if (elem == inputright) {
		inputleft.value = pairedValue;
		inputslider.setAttribute('value', pairedValue);
	}

	// change score values in scores array
	peg.scores.set(factor.test, factor.factor, newValue);

	peg.graph.draw(inputslider);
	
	// redraw the gifts section based on the new scores
	drawGiftsSection(factor);

	recalcDerived();
}

drawGiftsSection = function(factor) {
	var s = '';
	var ts, gift;
	var score = peg.scores.get(factor.test, factor.factor);

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

	// reverse range for paired factors
	var displayrange = range;
	var factorhigh = factor.left;
	var factorlow = factor.right;
	var pcthigh = score.pct;
	var pctlow = 100 - score.pct;

	if (peg.tests[factor.test].dimensions == 'paired') {
		if (range == 'average') {
			displayrange = 'balanced';
		}
		else if (range == 'low') {
			displayrange = 'high';
			factorhigh = factor.right;
			factorlow = factor.left;
			pcthigh = 100 - score.pct;
			pctlow = score.pct;
		}
	}
	
	// compose definition
	if (peg.tests[factor.test].dimensions == 'single') {
		s += '<p class="definition">I am a ' + range + ' ' + factor.left + ' (' + score.pct + '%)';
	}
	else { // paired
		if (displayrange == 'balanced') {
			s += '<p class="definition">I am roughly balanced between ' + factor.left + ' (' + score.pct + '%) and ' + factor.right + ' (' + (100 - score.pct) + '%).</p>';
		}
		else {
		s += '<p class="definition">I am a high ' + factorhigh + ' (' + pcthigh + '%)';
			s += ' as opposed to ' + factorlow + ' (' + pctlow + '%)';
		}
	}
	
	// compose gift section
	for (var i=0; i<peg.gifts.length; i++) {
		gift = peg.gifts[i];
		if (gift.test == factor.test && gift.factor == factor.factor && gift.range == range && gift.narrative != '') {
			s += '<p class="gift">' + gift.narrative + '</p>';
		}
	}

	// compose nourishment section
	for (var i=0; i<peg.nourishments.length; i++) {
		nourishment = peg.nourishments[i];
		if (nourishment.test == factor.test && nourishment.factor == factor.factor && nourishment.range == range) {
			s += '<p class="nourishment">' + nourishment.narrative + '</p>';
		}
	}

	// compose burnout section
	for (var i=0; i<peg.burnouts.length; i++) {
		burnout = peg.burnouts[i];
		if (burnout.test == factor.test && burnout.factor == factor.factor && burnout.range == range) {
			s += '<p class="burnout">' + burnout.narrative + '</p>';
		}
	}

	// compose comment section
	s += '<p><textarea>enter personal notes here</textarea></p>';

	// draw gifts area
	var giftarea = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] gifts' );
	giftarea.innerHTML = s;

	// draw chapter title
	var e = document.querySelector('chapter[id=' + factor.test + '-' + factor.factor + '] h3' );
	var drange = peg.strings[displayrange];
	var dname = factorhigh;
	if (displayrange == 'balanced') {
		dname = factor.left + ' and ' + factor.right;
	}
	e.innerHTML = drange + ' ' + dname;
	return;
}

recalcDerived = function() {
	var maxscore = peg.tests['zinn'].maxscore;
	var avgleft  = (peg.scores.get('pp','feelings').raw    + peg.scores.get('pp','curiosity').raw +  peg.scores.get('pp','resistance').raw + peg.scores.get('pp','tools').raw) / 4;
	var avgright = (peg.scores.get('pp','definitions').raw + peg.scores.get('pp','efficiency').raw + peg.scores.get('pp','authority').raw  + peg.scores.get('pp','wariness').raw) / 4;
	var bartot = avgleft + avgright;
	peg.scores.set('zinn','adventure', Math.round((avgleft/bartot) * maxscore));
	displayScore(peg.factors['zinn']['adventure']);

	avgleft  = (peg.scores.get('pp','affection').raw + peg.scores.get('pp','pressure').raw + peg.scores.get('pp','avoidance').raw + peg.scores.get('pp','disappointment').raw) / 4;
	avgright = (peg.scores.get('pp','acclaim').raw   + peg.scores.get('pp','direct').raw) / 2;
	var bartot = avgleft + avgright;
	peg.scores.set('zinn','personal', Math.round((avgleft/bartot) * maxscore));
	displayScore(peg.factors['zinn']['personal'] );
}

attachAllGraphs = function() {
	var graphs = document.querySelectorAll('graph')
	for (var i=0; i<graphs.length; i++) {
		peg.graph.attach(graphs[i]);
		var r = findParentChapter(graphs[i]);
		var factor = peg.factors[r.testname][r.factorname];
		var test = peg.tests[r.testname];
		graphs[i].setAttribute('min', test.minscore);
		graphs[i].setAttribute('max', test.maxscore);

		var graphdraw = calcGraphDraw(r.testname);
		graphs[i].setAttribute('draw', graphdraw);
	}
}

drawAllGraphs = function() {
	var graphs = document.querySelectorAll('graph')
	for (var i=0; i<graphs.length; i++) {
		peg.graph.draw(graphs[i]);
	}
}

/* option handlers */

var attachFormatter = function() {
	$('showscores').addEventListener('change', function(evt) {
		evt.currentTarget.blur();
		showScores(evt.currentTarget.checked);
		drawAllGraphs();
	}, false);
	$('showgifts').addEventListener('change', function(evt) {
		evt.currentTarget.blur();
		showGifts(evt.currentTarget.checked);
	}, false);
	$('orderbysignificance').addEventListener('change', function(evt) {
		evt.currentTarget.blur();
		orderBySignificance(evt.currentTarget.checked);
	}, false);

	var elems = document.querySelectorAll('[redraw]');
	for (var i=0; i<elems.length; i++) {
		var elem = elems[i];
		elem.addEventListener('click', function(evt) {
			evt.currentTarget.blur();
			redraw(evt.currentTarget.getAttribute('redraw'));
		}, false);
	}

	var elems = document.querySelectorAll('[name=sampleuser]');
	for (var i=0; i<elems.length; i++) {
		var elem = elems[i];
		elem.addEventListener('click', function(evt) {
			evt.currentTarget.blur();
			changeUser(evt.currentTarget.getAttribute('id'));
		}, false);
	}

	var elems = document.querySelectorAll('[name=graphdraw]');
	for (var i=0; i<elems.length; i++) {
		var elem = elems[i];
		elem.addEventListener('click', function(evt) {
			evt.currentTarget.blur();
			setGraphDraw(evt.currentTarget.getAttribute('id'));
		}, false);
	}
}

showScores = function(b) {
	peg.options.showscores = (b) ? 1 : 0;
	var elems = document.querySelectorAll('bar score');
	for (var i=0; i<elems.length; i++) {
		if (peg.options.showscores) {
			elems[i].removeAttribute('hidden');
		}
		else {
			elems[i].setAttribute('hidden', '');
		}
	}
}

showGifts = function(b) {
	peg.options.showgifts = (b) ? 1 : 0;
	var elems = document.querySelectorAll('chapter gifts, chapter h3');
	for (var i=0; i<elems.length; i++) {
		if (peg.options.showgifts) {
			elems[i].removeAttribute('hidden');
		}
		else {
			elems[i].setAttribute('hidden', '');
		}
	}
}

orderBySignificance = function(b) {
	peg.options.orderby = (b) ? 'significance' : 'test';
	draw();
}

setGraphDraw = function(id) {
	peg.options.graphdraw = id;
	var graphs = document.querySelectorAll('graph')
	for (var i=0; i<graphs.length; i++) {
		var r = findParentChapter(graphs[i]);
		var factor = peg.factors[r.testname][r.factorname];
		var test = peg.tests[r.testname];
//		if (test.vendorstyle != 'oneway') {
			var graphdraw = calcGraphDraw(r.testname);
			graphs[i].setAttribute('draw', graphdraw);
//		}
	}
	drawAllGraphs();
}

calcGraphDraw = function(testname) {
	var graphdraw = peg.options.graphdraw;
	if (graphdraw == 'vendor') {
		graphdraw = peg.tests[testname].vendorstyle;
	}

	var graphdraw = peg.tests[testname].vendorstyle;
	if (graphdraw != 'oneway' && peg.options.graphdraw != 'vendor') {
		graphdraw = peg.options.graphdraw;
	}
	return graphdraw;
}

redraw = function(format) {
	switch(format) {
		case 'circle':
			peg.options.showscores = 0;
			peg.options.showgifts = 0;
			peg.options.orderby = 'test';
			peg.options.format = 'circle';
			break;
		case 'entry':
			peg.options.showscores = 1;
			peg.options.showgifts = 0;
			peg.options.orderby = 'test';
			peg.options.format = 'tests';
			break;
		case 'summary':
			peg.options.showscores = 0;
			peg.options.showgifts = 0;
			peg.options.orderby = 'test';
			peg.options.format = 'tests';
			break;
		case 'detail':
			peg.options.showscores = 0;
			peg.options.showgifts = 1;
			peg.options.orderby = 'test';
			peg.options.format = 'tests';
			break;
		case 'personality':
			peg.options.showscores = 0;
			peg.options.showgifts = 0;
			peg.options.orderby = 'significance';
			peg.options.format = 'gifts';
			break;
	}

	toggleButton('format', 'redraw', format);
	toggleRadio('format', 'redraw', format);
	setCheckbox('showscores', peg.options.showscores);
	setCheckbox('showgifts', peg.options.showgifts);
	setCheckbox('orderbysignificance', (peg.options.orderby == 'significance'));

	draw();
}

toggleButton = function(toggle, attrib, value) {
	// select group of toggle buttons by toggle
	var elems = document.querySelectorAll('button[toggle=' + toggle + ']');
	for (var i=0; i<elems.length; i++) {
		var elem = elems[i];
		var a = elem.getAttribute(attrib);
		if (a == value) {
			elem.classList.add('down');
		}
		else {
			elem.classList.remove('down');
		}
	}
}

toggleRadio = function(name, attrib, value) {
	// select group of radio buttons by name
	var elems = document.querySelectorAll('input[type=radio][name=' + name + ']');
	for (var i=0; i<elems.length; i++) {
		var elem = elems[i];
		var a = elem.getAttribute(attrib);
		if (a == value) {
			elem.checked = true;
		}
		else {
			elem.checked = false;
		}
	}
}

setCheckbox = function(id, value) {
	var elem = document.getElementById(id);
	elem.checked = value;
}

changeUser = function(name) {
	peg.scores.read(name);
	draw();
}

adjustHeaderSize = function(name) {
	//var elem = document.querySelector('header');
	//var style = window.getComputedStyle(elem);
	//var w = parseInt(style.width);
	//var w = document.body.clientWidth;
	
	var w = window.innerWidth || document.body.clientWidth;
	
	if (w < 680) {
		document.getElementById('hdrtitle').innerHTML = 'PEG';
	}
	else {
		document.getElementById('hdrtitle').innerHTML = 'Personal Empowerment Guide';
	}
	if (w < 450) {
		document.getElementById('hdrformat').style.display = 'none';
	}
	else {
		document.getElementById('hdrformat').style.display = 'inline';
	}
	var x = w;
}

window.addEventListener('load', function() {
	peg.graph = new Graph();
	peg.scores = new Scores();
	peg.scores.read('joe');
	attachFormatter();
	draw();
	adjustHeaderSize();
}, false);

window.addEventListener('resize', function() {
	drawAllGraphs();
	adjustHeaderSize();
}, false);

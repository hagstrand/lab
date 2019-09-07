// manage the options
function Options() {
	this.options = {
		showScores: 0,
		showGifts: 0,
		orderBy: 'test',  // test, significance
		format: 'tests',  // tests, gifts
		graphdraw: 'vendordefault',  // vendordefault, combined, offcenter
		sampleuser: 'joe',  // joe, sally, alan
	}
}

Options.prototype.set = function(name, value) {
	this.options[name] = value;
}
Options.prototype.get = function(name) {
	return this.options[name];
}

Options.prototype.attach = function() {
	$('showscores').addEventListener('change', function(evt) {
		evt.currentTarget.blur();
		var value = (evt.currentTarget.checked) ? 1 : 0;
		this.set('showscores', value);
//		showScores(value);
//		drawAllGraphs();
	}, false);

	$('showgifts').addEventListener('change', function(evt) {
		evt.currentTarget.blur();
		var value = (evt.currentTarget.checked) ? 1 : 0;
		this.set('showgifts', value);
//		showGifts(value);
	}, false);

	$('orderbysignificance').addEventListener('change', function(evt) {
		evt.currentTarget.blur();
		var value = (evt.currentTarget.checked) ? 'significance' : 'gift';
		this.set('orderBy', value);
//		orderBySignificance(evt.currentTarget.checked);
	}, false);

	var elems = document.querySelectorAll('[redraw]');
	for (var i=0; i<elems.length; i++) {
		var elem = elems[i];
		elem.addEventListener('click', function(evt) {
			evt.currentTarget.blur();
			var value = evt.currentTarget.getAttribute('redraw');
			this.set('format', value);
//			redraw(value);
		}, false);
	}

	var elems = document.querySelectorAll('[name=sampleuser]');
	for (var i=0; i<elems.length; i++) {
		var elem = elems[i];
		elem.addEventListener('click', function(evt) {
			evt.currentTarget.blur();
			var value = evt.currentTarget.getAttribute('id');
			this.set('sampleuser', value);
//			changeUser(value);
		}, false);
	}
}

showScores = function(b) {
	peg.options.options.showScores = (b) ? 1 : 0;
	var elems = document.querySelectorAll('bar score');
	for (var i=0; i<elems.length; i++) {
		if (peg.options.options.showScores) {
			elems[i].removeAttribute('hidden');
		}
		else {
			elems[i].setAttribute('hidden', '');
		}
	}
}

showGifts = function(b) {
	peg.options.options.showGifts = (b) ? 1 : 0;
	var elems = document.querySelectorAll('chapter gifts, chapter h3');
	for (var i=0; i<elems.length; i++) {
		if (peg.options.options.showGifts) {
			elems[i].removeAttribute('hidden');
		}
		else {
			elems[i].setAttribute('hidden', '');
		}
	}
}

orderBySignificance = function(b) {
	peg.options.options.orderBy = (b) ? 'significance' : 'test';
	draw();
}

setGraphDraw = function(b) {
	
	draw();
}

redraw = function(format) {
	switch(format) {
		case 'entry':
			peg.options.options = {
				showScores: 1,
				showGifts: 0,
				orderBy: 'test',
				format: 'tests',
			}
			break;
		case 'summary':
			peg.options.options = {
				showScores: 0,
				showGifts: 0,
				orderBy: 'test',
				format: 'tests',
			}
			break;
		case 'detail':
			peg.options.options = {
				showScores: 0,
				showGifts: 1,
				orderBy: 'test',
				format: 'tests',
			}
			break;
		case 'personality':
			peg.options.options = {
				showScores: 0,
				showGifts: 0,
				orderBy: 'significance',
				format: 'gifts',
			}
			break;
	}
	draw();
}

changeUser = function(name) {
	peg.scores.read(name);
	draw();
}

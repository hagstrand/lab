// manage the scores for one user
function Scores() {
	this.scores = [];
}

Scores.prototype.set = function(testid, factorid, rawscore) {
	var score = this.find(testid, factorid);
	if (!score) alert(testid + ' ' + factorid);
	score.raw = rawscore;
	this.calcScore(score);
}

Scores.prototype.get = function(testid, factorid) {
	var score = this.find(testid, factorid);
	if (score) {
		return {
			raw: score.raw,
			pct: score.pct,
			offset: score.offset,
			dir: score.dir,
			range: score.range,
		}
	}
	else return null;
}

Scores.prototype.read = function(name) {
	// load scores for current user
	this.scores = exampleScores[name];
	this.initScores();
}

Scores.prototype.write = function() {
	// save scores for current user
}

Scores.prototype.find = function(testid, factorid) {
	var score;
	for (var i=0; i<this.scores.length; i++) {
		score = this.scores[i];
		if (score.testid == testid && score.factorid == factorid) {
			return score;
		}
	}
	return null;
}

Scores.prototype.initScores = function() {
	var score;
	for (var i=0; i<this.scores.length; i++) {
		score = this.scores[i];
		this.calcScore(score);
	}
	return null;
}

Scores.prototype.calcScore = function(score) {
	var max = peg.tests[score.testid].maxscore;
	var mean = 50;
	score.pct = Math.round((score.raw / max) * 100);
	var offset = mean - score.pct;
	score.dir = (offset > 0) ? 1 : (offset < 0) ? -1 : 0;
	score.offset = Math.abs(offset);
}

Scores.prototype.reorder = function() {
	if (peg.options.orderby == 'significance') {
		this.scores.sort(function(a, b){return b.offset-a.offset});
	}
	else if (peg.options.orderby == 'test') {
		this.scores.sort(function(a, b){return a.order-b.order});
	}
};


var exampleScores = {
	joe: [
		{ order: 1, testid:'kiersey',     factorid:'extravert',      raw: 7   },
		{ order: 3, testid:'kiersey',     factorid:'sensible',       raw: 0.5 },
		{ order: 5, testid:'kiersey',     factorid:'thinking',       raw: 3.5 },
		{ order: 7, testid:'kiersey',     factorid:'judicious',      raw: 8   },

		{ order: 9, testid:'pp',          factorid:'definitions',    raw: 2   },
		{ order:10, testid:'pp',          factorid:'feelings',       raw: 4   },
		{ order:11, testid:'pp',          factorid:'efficiency',     raw: 7   },
		{ order:12, testid:'pp',          factorid:'curiosity',      raw: 2   },
		{ order:13, testid:'pp',          factorid:'authority',      raw: 6   },
		{ order:14, testid:'pp',          factorid:'resistance',     raw: 7   },
		{ order:15, testid:'pp',          factorid:'wariness',       raw: 3   },
		{ order:16, testid:'pp',          factorid:'tools',          raw: 5   },
		{ order:17, testid:'pp',          factorid:'affection',      raw: 9   },
		{ order:18, testid:'pp',          factorid:'acclaim',        raw: 1   },
		{ order:19, testid:'pp',          factorid:'pressure',       raw: 6   },
		{ order:20, testid:'pp',          factorid:'direct',         raw:10   },
		{ order:21, testid:'pp',          factorid:'avoidance',      raw: 0   },
		{ order:22, testid:'pp',          factorid:'disappointment', raw: 5   },

		{ order:23, testid:'zinn',        factorid:'adventure',      raw:0    },
		{ order:25, testid:'zinn',        factorid:'personal',       raw:0    },

		{ order:27, testid:'pf16global',  factorid:'extraversion',   raw: 7.2 },
		{ order:28, testid:'pf16global',  factorid:'anxiety',        raw: 1.5 },
		{ order:29, testid:'pf16global',  factorid:'tough',          raw: 6.5 },
		{ order:30, testid:'pf16global',  factorid:'independence',   raw: 6.7 },
		{ order:31, testid:'pf16global',  factorid:'selfcontrol',    raw: 2.6 },

		{ order:32, testid:'pf16primary', factorid:'warm',           raw: 4   },
		{ order:33, testid:'pf16primary', factorid:'abstract',       raw: 9   },
		{ order:34, testid:'pf16primary', factorid:'stable',         raw: 2   },
		{ order:35, testid:'pf16primary', factorid:'dominant',       raw: 4   },
		{ order:36, testid:'pf16primary', factorid:'lively',         raw: 7   },
		{ order:37, testid:'pf16primary', factorid:'rule',           raw: 2   },
		{ order:38, testid:'pf16primary', factorid:'bold',           raw: 6   },
		{ order:39, testid:'pf16primary', factorid:'sensitive',      raw: 7   },
		{ order:40, testid:'pf16primary', factorid:'vigilant',       raw: 1   },
		{ order:41, testid:'pf16primary', factorid:'abstracted',     raw: 4   },
		{ order:42, testid:'pf16primary', factorid:'private',        raw: 8   },
		{ order:43, testid:'pf16primary', factorid:'apprehensive',   raw: 1   },
		{ order:44, testid:'pf16primary', factorid:'open',           raw: 6   },
		{ order:45, testid:'pf16primary', factorid:'selfreliant',    raw: 7   },
		{ order:46, testid:'pf16primary', factorid:'perfectionist',  raw: 3   },
		{ order:47, testid:'pf16primary', factorid:'tense',          raw: 6   },

		{ order:48, testid:'eji',         factorid:'aware',          raw:80   },
		{ order:49, testid:'eji',         factorid:'identifyown',    raw:29   },
		{ order:50, testid:'eji',         factorid:'identifyothers', raw:47   },
		{ order:51, testid:'eji',         factorid:'manageown',      raw:91   },
		{ order:52, testid:'eji',         factorid:'manageothers',   raw:31   },
		{ order:53, testid:'eji',         factorid:'problemsolving', raw:60   },
		{ order:54, testid:'eji',         factorid:'express',        raw:77   },
		{ order:55, testid:'eji',         factorid:'impression',     raw:18   },
	],

	sally: [
		{ order: 1, testid:'kiersey',     factorid:'extravert',      raw: 4.5 },
		{ order: 3, testid:'kiersey',     factorid:'sensible',       raw: 7   },
		{ order: 5, testid:'kiersey',     factorid:'thinking',       raw: 0.5 },
		{ order: 7, testid:'kiersey',     factorid:'judicious',      raw: 3.5 },

		{ order: 9, testid:'pp',          factorid:'definitions',    raw: 8   },
		{ order:10, testid:'pp',          factorid:'feelings',       raw: 2   },
		{ order:11, testid:'pp',          factorid:'efficiency',     raw: 4   },
		{ order:12, testid:'pp',          factorid:'curiosity',      raw: 7   },
		{ order:13, testid:'pp',          factorid:'authority',      raw: 2   },
		{ order:14, testid:'pp',          factorid:'resistance',     raw: 6   },
		{ order:15, testid:'pp',          factorid:'wariness',       raw: 7   },
		{ order:16, testid:'pp',          factorid:'tools',          raw: 3   },
		{ order:17, testid:'pp',          factorid:'affection',      raw: 5   },
		{ order:18, testid:'pp',          factorid:'acclaim',        raw: 9   },
		{ order:19, testid:'pp',          factorid:'pressure',       raw: 1   },
		{ order:20, testid:'pp',          factorid:'direct',         raw: 6   },
		{ order:21, testid:'pp',          factorid:'avoidance',      raw:10   },
		{ order:22, testid:'pp',          factorid:'disappointment', raw: 0   },

		{ order:23, testid:'zinn',        factorid:'adventure',      raw: 0   },
		{ order:25, testid:'zinn',        factorid:'personal',       raw: 0   },

		{ order:27, testid:'pf16global',  factorid:'extraversion',   raw: 4.6 },
		{ order:28, testid:'pf16global',  factorid:'anxiety',        raw: 7.2 },
		{ order:29, testid:'pf16global',  factorid:'tough',          raw: 1.5 },
		{ order:30, testid:'pf16global',  factorid:'independence',   raw: 6.5 },
		{ order:31, testid:'pf16global',  factorid:'selfcontrol',    raw: 6.7 },

		{ order:32, testid:'pf16primary', factorid:'warm',           raw: 6   },
		{ order:33, testid:'pf16primary', factorid:'abstract',       raw: 8   },
		{ order:34, testid:'pf16primary', factorid:'stable',         raw: 9   },
		{ order:35, testid:'pf16primary', factorid:'dominant',       raw: 2   },
		{ order:36, testid:'pf16primary', factorid:'lively',         raw: 4   },
		{ order:37, testid:'pf16primary', factorid:'rule',           raw: 7   },
		{ order:38, testid:'pf16primary', factorid:'bold',           raw: 2   },
		{ order:39, testid:'pf16primary', factorid:'sensitive',      raw: 6   },
		{ order:40, testid:'pf16primary', factorid:'vigilant',       raw: 7   },
		{ order:41, testid:'pf16primary', factorid:'abstracted',     raw: 1   },
		{ order:42, testid:'pf16primary', factorid:'private',        raw: 4   },
		{ order:43, testid:'pf16primary', factorid:'apprehensive',   raw: 8   },
		{ order:44, testid:'pf16primary', factorid:'open',           raw: 1   },
		{ order:45, testid:'pf16primary', factorid:'selfreliant',    raw: 6   },
		{ order:46, testid:'pf16primary', factorid:'perfectionist',  raw: 7   },
		{ order:47, testid:'pf16primary', factorid:'tense',          raw: 3   },

		{ order:48, testid:'eji',         factorid:'aware',          raw:38   },
		{ order:49, testid:'eji',         factorid:'identifyown',    raw:80   },
		{ order:50, testid:'eji',         factorid:'identifyothers', raw:29   },
		{ order:51, testid:'eji',         factorid:'manageown',      raw:47   },
		{ order:52, testid:'eji',         factorid:'manageothers',   raw:91   },
		{ order:53, testid:'eji',         factorid:'problemsolving', raw:31   },
		{ order:54, testid:'eji',         factorid:'express',        raw:60   },
		{ order:55, testid:'eji',         factorid:'impression',     raw:77   },
	],

	alan: [
		{ order: 1, testid:'kiersey',     factorid:'extravert',      raw: 2.5 },
		{ order: 3, testid:'kiersey',     factorid:'sensible',       raw: 6   },
		{ order: 5, testid:'kiersey',     factorid:'thinking',       raw: 7   },
		{ order: 7, testid:'kiersey',     factorid:'judicious',      raw: 0.5 },

		{ order: 9, testid:'pp',          factorid:'definitions',    raw: 5   },
		{ order:10, testid:'pp',          factorid:'feelings',       raw: 8   },
		{ order:11, testid:'pp',          factorid:'efficiency',     raw: 2   },
		{ order:12, testid:'pp',          factorid:'curiosity',      raw: 4   },
		{ order:13, testid:'pp',          factorid:'authority',      raw: 7   },
		{ order:14, testid:'pp',          factorid:'resistance',     raw: 2   },
		{ order:15, testid:'pp',          factorid:'wariness',       raw: 6   },
		{ order:16, testid:'pp',          factorid:'tools',          raw: 7   },
		{ order:17, testid:'pp',          factorid:'affection',      raw: 3   },
		{ order:18, testid:'pp',          factorid:'acclaim',        raw: 5   },
		{ order:19, testid:'pp',          factorid:'pressure',       raw: 9   },
		{ order:20, testid:'pp',          factorid:'direct',         raw: 1   },
		{ order:21, testid:'pp',          factorid:'avoidance',      raw: 6   },
		{ order:22, testid:'pp',          factorid:'disappointment', raw:10   },

		{ order:23, testid:'zinn',        factorid:'adventure',      raw: 0   },
		{ order:25, testid:'zinn',        factorid:'personal',       raw: 0   },

		{ order:27, testid:'pf16global',  factorid:'extraversion',   raw: 2.4 },
		{ order:28, testid:'pf16global',  factorid:'anxiety',        raw: 3.7 },
		{ order:29, testid:'pf16global',  factorid:'tough',          raw: 7.2 },
		{ order:30, testid:'pf16global',  factorid:'independence',   raw: 1.5 },
		{ order:31, testid:'pf16global',  factorid:'selfcontrol',    raw: 6.5 },

		{ order:32, testid:'pf16primary', factorid:'warm',           raw: 2   },
		{ order:33, testid:'pf16primary', factorid:'abstract',       raw: 5   },
		{ order:34, testid:'pf16primary', factorid:'stable',         raw: 4   },
		{ order:35, testid:'pf16primary', factorid:'dominant',       raw: 9   },
		{ order:36, testid:'pf16primary', factorid:'lively',         raw: 2   },
		{ order:37, testid:'pf16primary', factorid:'rule',           raw: 4   },
		{ order:38, testid:'pf16primary', factorid:'bold',           raw: 7   },
		{ order:39, testid:'pf16primary', factorid:'sensitive',      raw: 2   },
		{ order:40, testid:'pf16primary', factorid:'vigilant',       raw: 6   },
		{ order:41, testid:'pf16primary', factorid:'abstracted',     raw: 7   },
		{ order:42, testid:'pf16primary', factorid:'private',        raw: 1   },
		{ order:43, testid:'pf16primary', factorid:'apprehensive',   raw: 4   },
		{ order:44, testid:'pf16primary', factorid:'open',           raw: 8   },
		{ order:45, testid:'pf16primary', factorid:'selfreliant',    raw: 1   },
		{ order:46, testid:'pf16primary', factorid:'perfectionist',  raw: 6   },
		{ order:47, testid:'pf16primary', factorid:'tense',          raw: 7   },

		{ order:48, testid:'eji',         factorid:'aware',          raw:77   },
		{ order:49, testid:'eji',         factorid:'identifyown',    raw:18   },
		{ order:50, testid:'eji',         factorid:'identifyothers', raw:80   },
		{ order:51, testid:'eji',         factorid:'manageown',      raw:29   },
		{ order:52, testid:'eji',         factorid:'manageothers',   raw:47   },
		{ order:53, testid:'eji',         factorid:'problemsolving', raw:91   },
		{ order:54, testid:'eji',         factorid:'express',        raw:31   },
		{ order:55, testid:'eji',         factorid:'impression',     raw:60   },
	],
}

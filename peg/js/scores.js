// manage the scores for one user
function Scores() {
	this.raw = [];
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
	//this.scores = exampleScores[name];
	//this.initScores();
	this.raw = exampleScores[name];
	this.init();
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

/*
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
*/

Scores.prototype.init = function() {
	var test, group, factor, score;
	var grp = {
		num:0,
		n:0,
		m:0,
	}
	for (test in peg.factors) {
		for (group in peg.factors[test]) {
			for (factor in peg.factors[test][group]) {
				
				var raw = this.raw[factor];
				var max = peg.tests[test].maxscore;
				var pct = Math.round((raw / max) * 100);
				
				score = {
					display: peg.factors[test][group][factor].display,
					pct: pct,
					grp: {
						num: grp.num,
						n: grp.n,
						m: grp.m,
					}
				}
				this.scores.push(score);
				grp.n++;
				grp.m++;
			}
			for (var i=1; i<grp.m; i++) {
				this.scores[this.scores.length - i - 1].grp.m = grp.m - 1;
			}
			grp.num++;
			grp.n = 0;
			grp.m = 0;
		}
	}


//	for (var i=0; i<this.scores.length; i++) {
//		score = this.scores[i];
//		this.calcScore(score);
//	}
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
	joe: {
		visual		: 6   ,
		auditory	: 3   ,
		kinesthetic	: 1   ,
	                         
		adventure	: 9   ,
		comfort		: 1   ,
		personal	: 4   ,
		'public'	: 5   ,

		introvert	: 3   ,
		extravert	: 7   ,
		sensible	: 0.5 ,
		intuitive	: 9.5 ,
		thinking	: 3.5 ,
		feeling		: 6.5 ,
		judicious	: 8   ,
		perceptive	: 2   ,

		guardian	:25   ,
		saver		:25   ,
		innocent	:13   ,
		other		:37   ,
		
		definitions	: 2   ,
		feelings	: 4   ,
		efficiency	: 7   ,
		curiosity	: 2   ,
		authority	: 6   ,
		resistance	: 7   ,
		wariness	: 3   ,
		tools		: 5   ,
		affection	: 9   ,
		acclaim		: 1   ,
		pressure	: 6   ,
		direct		:10   ,
		avoidance	: 0   ,
		disappointment	: 5   ,

		introversion	: 2.8 ,
		extraversion	: 7.2 ,
		lowanxiety	: 8.5 ,
		anxiety		: 1.5 ,
		receptive	: 3.5 ,
		tough		: 6.5 ,
		accomodation: 3.3 ,
		independence: 6.7 ,
		unrestrained: 7.4 ,
		selfcontrol	: 2.6 ,

		reserved	: 6   ,
		warm		: 4   ,
		concrete	: 1   ,
		'abstract'	: 9   ,
		reactive	: 8   ,
		stable		: 2   ,
		deferential	: 6   ,
		dominant	: 4   ,
		serious		: 3   ,
		lively		: 7   ,
		expedient	: 8   ,
		rule		: 2   ,
		shy			: 4   ,
		bold		: 6   ,
		utilitarian	: 3   ,
		sensitive	: 7   ,
		trusting	: 9   ,
		vigilant	: 1   ,
		grounded	: 6   ,
		abstracted	: 4   ,
		forthright	: 2   ,
		'private'	: 8   ,
		selfassured : 9   ,
		apprehensive: 1   ,
		traditional	: 4   ,
		open		: 6   ,
		grouporiented: 3   ,
		selfreliant	: 7   ,
		sloppy		: 7   ,
		perfectionist: 3   ,
		relaxed		: 4   ,
		tense		: 6   ,

		aware		:80   ,
		identifyown	:29   ,
		identifyothers	:47   ,
		manageown	:91   ,
		manageothers:31   ,
		problemsolving	:60   ,
		express		:77   ,
		impression	:18   ,
	},

	sally: {
		extravert	: 4.5 ,
		sensible	: 7   ,
		thinking	: 0.5 ,
		judicious	: 3.5 ,

		definitions	: 8   ,
		feelings	: 2   ,
		efficiency	: 4   ,
		curiosity	: 7   ,
		authority	: 2   ,
		resistance	: 6   ,
		wariness	: 7   ,
		tools		: 3   ,
		affection	: 5   ,
		acclaim		: 9   ,
		pressure	: 1   ,
		direct		: 6   ,
		avoidance	:10   ,
		disappointment	: 0   ,

		adventure	: 0   ,
		personal	: 0   ,

		extraversion: 4.6 ,
		anxiety		: 7.2 ,
		tough		: 1.5 ,
		independence: 6.5 ,
		selfcontrol	: 6.7 ,

		warm		: 6   ,
		abstract	: 8   ,
		stable		: 9   ,
		dominant	: 2   ,
		lively		: 4   ,
		rule		: 7   ,
		bold		: 2   ,
		sensitive	: 6   ,
		vigilant	: 7   ,
		abstracted	: 1   ,
		private		: 4   ,
		apprehensive: 8   ,
		open		: 1   ,
		selfreliant	: 6   ,
		perfectionist	: 7   ,
		tense		: 3   ,

		aware		:38   ,
		identifyown	:80   ,
		identifyothers	:29   ,
		manageown	:47   ,
		manageothers:91   ,
		problemsolving	:31   ,
		express		:60   ,
		impression	:77   ,
	},

	alan: {
		extravert	: 2.5 ,
		sensible	: 6   ,
		thinking	: 7   ,
		judicious	: 0.5 ,

		definitions	: 5   ,
		feelings	: 8   ,
		efficiency	: 2   ,
		curiosity	: 4   ,
		authority	: 7   ,
		resistance	: 2   ,
		wariness	: 6   ,
		tools		: 7   ,
		affection	: 3   ,
		acclaim		: 5   ,
		pressure	: 9   ,
		direct		: 1   ,
		avoidance	: 6   ,
		disappointment	:10   ,

		adventure	: 0   ,
		personal	: 0   ,

		extraversion: 2.4 ,
		anxiety		: 3.7 ,
		tough		: 7.2 ,
		independence: 1.5 ,
		selfcontrol	: 6.5 ,

		warm		: 2   ,
		abstract	: 5   ,
		stable		: 4   ,
		dominant	: 9   ,
		lively		: 2   ,
		rule		: 4   ,
		bold		: 7   ,
		sensitive	: 2   ,
		vigilant	: 6   ,
		abstracted	: 7   ,
		private		: 1   ,
		apprehensive: 4   ,
		open		: 8   ,
		selfreliant	: 1   ,
		perfectionist	: 6   ,
		tense		: 7   ,

		aware		:77   ,
		identifyown	:18   ,
		identifyothers	:80   ,
		manageown	:29   ,
		manageothers:47   ,
		problemsolving	:91   ,
		express		:31   ,
		impression	:60
	},
}

peg.tests = {
	vak: {
		display: 'Visual Auditory Kinesthetic (VAK)',
		minscore: 0,
		maxscore: 10,
		step: .5,
		dimensions: 'paired', // single or paired
		vendorstyle: 'paired', // oneway, paired or offcenter
		pairedscore: true,
		company: '',
		derived: false,
		hassubs: false,
		mean: 50,
		low: 30,
		high: 70,

		// low: between 0 and 30
		// avg: between 31 and 70
		// high: between 71 and 100

	},
	money: {
		display: 'How You Spend Money',
		minscore: 0,
		maxscore: 100,
		step: .5,
		dimensions: 'paired', // single or paired
		vendorstyle: 'paired', // oneway, paired or offcenter
		pairedscore: true,
		company: '',
		derived: false,
		hassubs: false,
		mean: 50,
		low: 30,
		high: 70,

		// low: between 0 and 30
		// avg: between 31 and 70
		// high: between 71 and 100

	},
	kiersey: {
		display: 'Kiersey Temperament',
		minscore: 0,
		maxscore: 10,
		step: .5,
		dimensions: 'paired', // single or paired
		vendorstyle: 'paired', // oneway, paired or offcenter
		pairedscore: true,
		company: '',
		derived: false,
		hassubs: false,
		mean: 50,
		low: 30,
		high: 70,

		// low: between 0 and 30
		// avg: between 31 and 70
		// high: between 71 and 100

	},
	pp: {
		display: 'Personal Priorities',
		minscore: 0,
		maxscore: 10,
		mean: 5,
		step: 1,
		dimensions: 'single', // single or paired
		vendorstyle: 'oneway', // oneway, paired or offcenter
		pairedscore: false,
		company: '',
		derived: false,
		hassubs: false,
	},
	zinn: {
		display: 'Dr Zinn Derived',
		minscore: 0,
		maxscore: 10,
		mean: 5,
		step: 1,
		dimensions: 'paired', // single or paired
		vendorstyle: 'paired', // oneway, paired or offcenter
		pairedscore: true,
		company: 'Dr Zinn, Encinitas CA, www.drzinn.com',
		derived: true,
		hassubs: false,
	},
	pf16global: {
		display: '16PF Global',
		minscore: 0,
		maxscore: 10,
		mean: 5,
		step: 1,
		dimensions: 'paired', // single or paired
		vendorstyle: 'offcenter', // oneway, paired or offcenter
		pairedscore: false,
		company: '',
		derived: false,
		hassubs: false,
	},
	pf16primary: {
		display: '16PF Primary',
		minscore: 0,
		maxscore: 10,
		mean: 5,
		step: 1,
		dimensions: 'paired', // single or paired
		vendorstyle: 'offcenter', // oneway, paired or offcenter
		pairedscore: false,
		company: 'Raymond Cattell',
		derived: false,
		hassubs: true,
	},
	eji: {
		display: 'Emotional Judgement Inventory',
		minscore: 0,
		maxscore: 100,
		mean: 50,
		step: 1,
		dimensions: 'single', // single or paired
		vendorstyle: 'oneway', // oneway, paired or offcenter
		pairedscore: false,
		company: 'IPAT Inc., Champaign IL, www.ipat.com',
		derived: false,
		hassubs: false,
	},
}

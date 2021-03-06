peg.factors = {
	temperament: {
		extravert: {
			test: 'temperament',
			factor: 'extravert',
			left: 'Extravert',
			right: 'Introvert',
			aleft: 'E',
			aright: 'I',
		},
		sensible: {
			test: 'temperament',
			factor: 'sensible',
			left: 'Sensible-Practical',
			right: 'Intuitive-Creative',
			aleft: 'S',
			aright: 'N',
		},
		thinking: {
			test: 'temperament',
			factor: 'thinking',
			left: 'Thinking',
			right: 'Feeling',
			aleft: 'T',
			aright: 'F',
		},
		judicious: {
			test: 'temperament',
			factor: 'judicious',
			left: 'Judicious',
			right: 'Perceptive-Spontaneous',
			aleft: 'J',
			aright: 'P',
		},
	},
	motivation: {
		adventure: {
			test: 'motivation',
			factor: 'adventure',
			pole: 2,
			global: true,
			left: 'Adventure-Freedom',
			right: 'Comfort-Control',
			aleft: 'AF',
			aright: 'CC',
			//leftcomponents:['definitions','efficiency','authority','wariness'],
			//rightcomponents:['feelings','curiosity','pressure','tools'],
			components:['definitions','efficiency','authority','wariness','feelings','curiosity','pressure','tools'],
		},
		personal: {
			test: 'motivation',
			factor: 'personal',
			pole: 2,
			global: true,
			left: 'Personal Affiliation',
			right: 'Public Recognition',
			aleft: 'Per',
			aright: 'Pub',
			//leftcomponents:['affection', 'pressure', 'avoidance', 'disappointment'],
			//rightcomponents:['acclaim', 'direct'],
			components:['affection', 'pressure', 'avoidance', 'disappointment','acclaim', 'direct'],
		},
		definitions: {
			test: 'motivation',
			factor: 'definitions',
			left: 'Need for Definitions',
			aleft: 'Definitions',
		},
		feelings: {
			test: 'motivation',
			factor: 'feelings',
			left: 'Emphasis on Personal Feelings',
			aleft: 'Feelings',
		},
		efficiency: {
			test: 'motivation',
			factor: 'efficiency',
			left: 'Emphasis on Efficiency',
			aleft: 'Efficiency',
		},
		curiosity: {
			test: 'motivation',
			factor: 'curiosity',
			left: 'Active Curiosity',
			aleft: 'Curiosity',
		},
		authority: {
			test: 'motivation',
			factor: 'authority',
			left: 'Need for Established Authority',
			aleft: 'Authority',
		},
		resistance: {
			test: 'motivation',
			factor: 'resistance',
			left: 'Resistance to Social Pressure',
			aleft: 'Resistance',
		},
		wariness: {
			test: 'motivation',
			factor: 'wariness',
			left: 'Wariness of People',
			aleft: 'Wariness',
		},
		tools: {
			test: 'motivation',
			factor: 'tools',
			left: 'Pleasure in Tool Skills',
			aleft: 'Tools',
		},
		affection: {
			test: 'motivation',
			factor: 'affection',
			left: 'Need for Affectional Acceptance',
			aleft: 'Affection',
		},
		acclaim: {
			test: 'motivation',
			factor: 'acclaim',
			left: 'Need for Public Acclaim',
			aleft: 'Acclaim',
		},
		pressure: {
			test: 'motivation',
			factor: 'pressure',
			left: 'Feelings of Pressure',
			aleft: 'Pressure',
		},
		direct: {
			test: 'motivation',
			factor: 'direct',
			left: 'Desire to Direct Activities',
			aleft: 'Director',
		},
		avoidance: {
			test: 'motivation',
			factor: 'avoidance',
			left: 'Avoidance of Confrontations',
			aleft: 'Avoidance',
		},
		disappointment: {
			test: 'motivation',
			factor: 'disappointment',
			left: 'Feelings of Disappointment',
			aleft: 'Disappointment',
		},
	},
	personality: {
		extraversion: {
			test: 'personality',
			factor: 'extraversion',
			global: true,
			left:  'Introversion',
			right: 'Extraversion',
			components:['warm','lively','bold','private','selfreliant'],
		},
		anxiety: {
			pole: 1,   // override
			test: 'personality',
			factor: 'anxiety',
			global: true,
			left: 'Anxiety',
			components:['stable','vigilant','apprehensive','tense'],
		},
		tough: {
			test: 'personality',
			factor: 'tough',
			global: true,
			left: 'Receptivity',
			right: 'Tough-Mindedness',
			components:['warm','sensitive','abstract','open'],
		},
		independence: {
			test: 'personality',
			factor: 'independence',
			global: true,
			left: 'Accomodation',
			right:'Independence',
			components:['dominant','bold','vigilant','open'],
		},
		selfcontrol: {
			test: 'personality',
			factor: 'selfcontrol',
			global: true,
			left: 'Unrestrained',
			right: 'Self-Control',
			components:['lively','rule','abstracted','perfectionist'],
		},
		warm: {
			test: 'personality',
			factor: 'warm',
			code: 'a',
			left: 'Reserved',
			leftsub: 'aloof, detached',
			right: 'Warm',
			rightsub: 'friendly, attentive to others',
		},
		abstract: {
			test: 'personality',
			factor: 'abstract',
			code: 'b',
			left: 'Concrete',
			leftsub: 'less reasoning ability',
			right: 'Abstract',
			rightsub: 'more reasoning ability',
		},
		stable: {
			test: 'personality',
			factor: 'stable',
			code: 'c',
			left: 'Reactive',
			leftsub: 'less ego strength',
			right: 'Emotionally Stable',
			rightsub: 'more ego strength',
		},
		dominant: {
			test: 'personality',
			factor: 'dominant',
			code: 'e',
			left: 'Deferential',
			leftsub: 'submissive, humble',
			right: 'Dominant',
			rightsub: 'assertive, competitive',
		},
		lively: {
			test: 'personality',
			factor: 'lively',
			code: 'f',
			left: 'Serious',
			leftsub: 'inhibited, somber',
			right: 'Lively',
			rightsub: 'energetic, carefree',
		},
		rule: {
			test: 'personality',
			factor: 'rule',
			code: 'g',
			left: 'Expedient',
			leftsub: 'unconventional',
			right: 'Rule-Conscious',
			rightsub: 'conventional',
		},
		bold: {
			test: 'personality',
			factor: 'bold',
			code: 'h',
			left: 'Shy',
			leftsub: 'socially timid',
			right: 'Socially Bold',
			rightsub: 'venturesome, seeks attention',
		},
		sensitive: {
			test: 'personality',
			factor: 'sensitive',
			code: 'i',
			left: 'Utilitarian',
			leftsub: 'tough, unsentimental',
			right: 'Sensitive',
			rightsub: 'refined, sentimental',
		},
		vigilant: {
			test: 'personality',
			factor: 'vigilant',
			code: 'i',
			left: 'Trusting',
			leftsub: 'accepting, easygoing',
			right: 'Vigilant',
			rightsub: 'suspicious, skeptical',
		},
		abstracted: {
			test: 'personality',
			factor: 'abstracted',
			code: 'm',
			left: 'Grounded',
			leftsub: 'practical, pragmatic',
			right: 'Abstracted',
			rightsub: 'idea-oriented, imaginative',
		},
		private: {
			test: 'personality',
			factor: 'private',
			code: 'n',
			left: 'Forthright',
			leftsub: 'naive, self-disclosing',
			right: 'Private',
			rightsub: 'discreet, shrewd',
		},
		apprehensive: {
			test: 'personality',
			factor: 'apprehensive',
			code: 'o',
			left: 'Self-Assured',
			leftsub: 'secure, untroubled',
			right: 'Apprehensive',
			rightsub: 'guiltprone, worrying',
		},
		open: {
			test: 'personality',
			factor: 'open',
			code: 'q1',
			left: 'Traditional',
			leftsub: 'resists change',
			right: 'Open-to-change',
			rightsub: 'experimenting',
		},
		selfreliant: {
			test: 'personality',
			factor: 'selfreliant',
			code: 'q2',
			left: 'Group-Oriented',
			leftsub: 'socially group-dependent',
			right: 'Self-Reliant',
			rightsub: 'solitary, individualistic',
		},
		perfectionist: {
			test: 'personality',
			factor: 'perfectionist',
			code: 'q3',
			left: 'Tolerates Disorder',
			leftsub: 'careless',
			right: 'Perfectionistic',
			rightsub: 'orderly, compulsive',
		},
		tense: {
			test: 'personality',
			factor: 'tense',
			code: 'q4',
			left: 'Relaxed',
			leftsub: 'placid, patient',
			right: 'Tense',
			rightsub: 'driven, fastpaced',
		},
	},
	eji: {
		summary: { 
			test:'eji', 
			factor:'summary',
			global: true,
			code:'',
			left:'EQ',
			max:0,
			components:['aware','identifyown','identifyothers','manageown','manageothers','problemsolving','express','impression'],
		},
		aware: {
			test: 'eji',
			factor: 'aware',
			code: 'aw',
			left: 'Being Aware of Emotions',
			aleft: 'Awareness',
		},
		identifyown: {
			test: 'eji',
			factor: 'identifyown',
			code: 'is',
			left: 'Identifying Own Emotions',
			aleft: 'Identify Mine',
		},
		identifyothers: {
			test: 'eji',
			factor: 'identifyothers',
			code: 'io',
			left: 'Identifying Others\' Emotions',
			aleft: 'Identify Others\'',
		},
		manageown: {
			test: 'eji',
			factor: 'manageown',
			code: 'ms',
			left: 'Managing Own Emotions',
			aleft: 'Manage Mine',
		},
		manageothers: {
			test: 'eji',
			factor: 'manageothers',
			code: 'mo',
			left: 'Managing Others\' Emotions',
			aleft: 'Manage Others\'',
		},
		problemsolving: {
			test: 'eji',
			factor: 'problemsolving',
			code: 'ps',
			left: 'Using Emotions in Problem Solving',
			aleft: 'Problem Solving',
		},
		express: {
			test: 'eji',
			factor: 'express',
			code: 'ex',
			left: 'Expressing Emotions Adaptively',
			aleft: 'Expression',
		},
		impression: {
			test: 'eji',
			factor: 'impression',
			code: 'im',
			left: 'Impression Management',
			left: 'Impression',
		},
	},
	soi: {
		figural: { 
			test:'soi', 
			factor:'figural',
			global: true,
			code:'',
			left:'Figural Skills',
			aleft:'Figural',
			max:0,
			components:['CFU','CFC','MFU','EFU','EFC','CFS','CFT','NFU','DFU'],
		},
		symbolic: { 
			test:'soi', 
			factor:'symbolic',
			global: true,
			code:'',
			left:'Symbolic Skills',
			aleft:'Symbolic',
			max:0,
			//components:['CSS','MSUv','MSSv','MSUa','MSUv','ESC','ESS','NSS','NST', 'NSI', 'CSR', 'DSR'],
			components:['MSUv','MSSv','MSUa','MSUv','ESC','ESS','NSS','NST', 'NSI', 'CSR', 'DSR'],
		},
		semantic: { 
			test:'soi', 
			factor:'semantic',
			global: true,
			code:'',
			left:'Semantic Skills',
			aleft:'Semantic',
			max:0,
			components:['CMU_R','CMU_M','CMR','CMS','DMU','MMI'],
		},
		comprehension: { 
			test:'soi', 
			factor:'comprehension',
			global: true,
			code:'',
			left:'Comprehension', /* Cognition */
			aleft:'Comprehension', /* Cognition */
			max:0,
			//components:['CFU','CFC','CFS','CFT','CSR','CSS','CMU_R','CMU_M','CMR','CMS'],
			components:['CFU','CFC','CFS','CFT','CSR','CMU_R','CMU_M','CMR','CMS'],
		},
		memory: { 
			test:'soi', 
			factor:'memory',
			global: true,
			code:'',
			left:'Memory',
			aleft:'Memory',
			max:0,
			components:['MFU','MSUv','MSSv','MSUa','MSSa','MSI','MMI'],
		},
		evaluation: { 
			test:'soi', 
			factor:'evaluation',
			global: true,
			code:'',
			left:'Evaluation', /* Judgement */
			aleft:'Evaluation', /* Judgement */
			max:0,
			components:['EFU','EFC','ESC','ESS'],
		},
		problemsolving: { 
			test:'soi', 
			factor:'problemsolving',
			global: true,
			code:'',
			left:'Problem Solving', /* Convergent Production */
			aleft:'Problem Solving', /* Convergent Production */
			max:0,
			components:['NFU','NSS','NST','NSI'],
		},
		creativity: { 
			test:'soi', 
			factor:'creativity',
			global: true,
			code:'',
			left:'Creativity', /* Divergent Production */
			aleft:'Creativity', /* Divergent Production */
			max:0,
			components:['DFU','DMU','DSR'],
		},
		CFU: { 
			test:'soi', 
			factor:'CFU',
			code:'CFU',
			left:'Cognituion of Figural Units',
			aleft:'CFU',
			max:32,
		},
		CFC: { 
			test:'soi', 
			factor:'CFC',
			code:'CFC',
			left:'Cognition of Figural Classes',
			aleft:'CFC',
			max:9,
		},
		CFS: { 
			test:'soi', 
			factor:'CFS',
			code:'CFS',
			left:'Cognition of Figural Systems',
			aleft:'CFS',
			max:27,
		},
		CFT: { 
			test:'soi', 
			factor:'CFT',
			code:'CFT',
			left:'Cognition of Figural Transformations',
			aleft:'CFT',
			max:24,
		},
		CSR: { 
			test:'soi', 
			factor:'CSR',
			code:'CSR',
			left:'Cognition of Symbolic Relations',
			aleft:'CSR',
			max:9,
		},
		CMU_R: { 
			test:'soi', 
			factor:'CMU_R',
			code:'CMU_R',
			left:'Cognition of Semantic Units - Reading',
			aleft:'CMUr',
			max:30,
		},
		CMU_M: { 
			test:'soi', 
			factor:'CMU_M',
			code:'CMU_M',
			left:'Cognition of Semantic Units - Math',
			aleft:'CMUm',
			max:33,
		},
		CMR: { 
			test:'soi', 
			factor:'CMR',
			code:'CMR',
			left:'Cognition of Semantic Relations',
			aleft:'CMR',
			max:51,
		},
		CMS: { 
			test:'soi', 
			factor:'CMS',
			code:'CMS',
			left:'Cognition of Semantic Systems',
			aleft:'CMS',
			max:31,
		},
		MFU: { 
			test:'soi', 
			factor:'MFU',
			code:'MFU',
			left:'Memory of Figural Units',
			aleft:'MFU',
			max:24,
		},
		MSUv: { 
			test:'soi', 
			factor:'MSUv',
			code:'MSUv',
			left:'Memory of Symbolic Units - Visual',
			aleft:'MSUv',
			max:18,
		},
		MSSv: { 
			test:'soi', 
			factor:'MSSv',
			code:'MSSv',
			left:'Memory of Symbolic Systems - Visual',
			aleft:'MSSv',
			max:18,
		},
		MSUa: { 
			test:'soi', 
			factor:'MSUa',
			code:'MSUa',
			left:'Memory of Symbolic Units - Auditory',
			aleft:'MSUa',
			max:27,
		},
		MSSa: { 
			test:'soi', 
			factor:'MSSa',
			code:'MSSa',
			left:'Memory of Symbolic Systems - Auditory',
			aleft:'MSSa',
			max:27,
		},
		MSI: {  /* this factor is not reported in the Nancy Wilder example */
			test:'soi', 
			factor:'MSI',
			code:'MSI',
			left:'Memory of Symbolic Implications',
			aleft:'MSI',
			max:100,
		},
		MMI: { 
			test:'soi', 
			factor:'MMI',
			code:'MMI',
			left:'Memory of Semantic Implications',
			aleft:'MMI',
			max:16,
		},
		EFU: { 
			test:'soi', 
			factor:'EFU',
			code:'EFU',
			left:'Evaluation of Figural Units',
			aleft:'EFU',
			max:26,
		},
		EFC: { 
			test:'soi', 
			factor:'EFC',
			code:'EFC',
			left:'Evaluation of Figural Classes',
			aleft:'EFC',
			max:15,
		},
		ESC: { 
			test:'soi', 
			factor:'ESC',
			code:'ESC',
			left:'Evaluation of Symbolic Classes',
			aleft:'ESC',
			max:28,
		},
		ESS: { 
			test:'soi', 
			factor:'ESS',
			code:'ESS',
			left:'Evaluation of Symbolic Systems',
			aleft:'ESS',
			max:16,
		},
		NFU: { 
			test:'soi', 
			factor:'NFU',
			code:'NFU',
			left:'Convergent Production of Figural Units',
			aleft:'NFU',
			max:34,
		},
		NSS: { 
			test:'soi', 
			factor:'NSS',
			code:'NSS',
			left:'Convergent Production of Symbolic Systems',
			aleft:'NSS',
			max:8,
		},
		NST: { 
			test:'soi', 
			factor:'NST',
			code:'NST',
			left:'Convergent Production of Symbolic Transformations',
			aleft:'NST',
			max:171,
		},
		NSI: { 
			test:'soi', 
			factor:'NSI',
			code:'NSI',
			left:'Convergent Production of Symbolic Implications',
			aleft:'NSI',
			max:21,
		},
		DFU: { 
			test:'soi', 
			factor:'DFU',
			code:'DFU',
			left:'Divergent Production of Figural Units',
			aleft:'DFU',
			max:80,
		},
		DMU: { 
			test:'soi', 
			factor:'DMU',
			code:'DMU',
			left:'Divergent Production of Semantic Units',
			aleft:'DMU',
			max:119,
		},
		DSR: { 
			test:'soi', 
			factor:'DSR',
			code:'DSR',
			left:'Divergent Production of Symbolic Relations',
			aleft:'DSR',
			max:159,
		},
	},
}

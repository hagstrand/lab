vowels['sa'] = [  
	// s:sanscript, d:diacritic, f:filename, t:transliteration
	// h:3 http://sanskritdocuments.org/learning_tutorial_wikner/P005.html (12 vowels)
	// h:2 http://www.tilakpyle.com/sanskrit_alphabet.htm (13 vowels)
	// h:1 http://www.omniglot.com/writing/sanskrit.htm (14 vowels)
	// h:1 http://www.sanskritsounds.com/about-sanskrit/46/index.html 
	// h:0 unicode (19 vowels)
	{h:0, s:0x0904,d:0x0000,f:''  ,t:'short a'},
	{h:3, s:0x0905,d:0x0000,f:'a' ,t:'a'},
	{h:3, s:0x0906,d:0x093E,f:'aa',t:'ā'}, 
	{h:3, s:0x0907,d:0x093F,f:'i' ,t:'i'},
	{h:3, s:0x0908,d:0x0940,f:'ii',t:'ī'}, 
	{h:3, s:0x0909,d:0x0941,f:'u' ,t:'u'},
	{h:3, s:0x090A,d:0x0942,f:'uu',t:'ū'}, 
	{h:3, s:0x090B,d:0x0943,f:'r' ,t:'vocalic&nbsp;r'},
	{h:1, s:0x0960,d:0x0944,f:''  ,t:'vocalic&nbsp;rr'},
	{h:3, s:0x090C,d:0x0962,f:'l' ,t:'vocalic&nbsp;l'},
	{h:2, s:0x0961,d:0x0963,f:''  ,t:'vocalic&nbsp;ll'},
	{h:0, s:0x090D,d:0x0945,f:''  ,t:'candra&nbsp;e'},
	{h:0, s:0x090E,d:0x0946,f:''  ,t:'short&nbsp;e'},
	{h:3, s:0x090F,d:0x0947,f:'e' ,t:'e'},
	{h:3, s:0x0910,d:0x0948,f:'ai',t:'ai'},
	{h:0, s:0x0911,d:0x0949,f:''  ,t:'candra&nbsp;o'}, 
	{h:0, s:0x0912,d:0x094A,f:''  ,t:'short&nbsp;o'}, 
	{h:3, s:0x0913,d:0x094B,f:'o' ,t:'o'}, 
	{h:3, s:0x0914,d:0x094C,f:'ow',t:'au'}
];
endings['sa'] = [
	{h:0, d:0x0901,f:''  ,t:'an', a:1},
	{h:0, d:0x0902,f:''  ,t:'am', a:1},
	{h:0, d:0x0903,f:''  ,t:'ah', a:1},
	{h:0, d:0x094D,f:''  ,t:'virama', a:0}
];
consonants['sa'] = {
    // http://www.tilakpyle.com/sanskrit_alphabet.htm
	'k'  :{h:0, s:0x0915,f:'k',  t:'k'  ,m:'g'}, // guttural
	'kh' :{h:0, s:0x0916,f:'kh', t:'kh' ,m:'g'},
	'g'  :{h:0, s:0x0917,f:'g',  t:'g'  ,m:'g'},
	'gh' :{h:0, s:0x0918,f:'gh', t:'gh' ,m:'g'},
	'ng' :{h:0, s:0x0919,f:'ng', t:'ng' ,m:'g'},
	'ch' :{h:0, s:0x091A,f:'ch', t:'c'  ,m:'p'}, // palatal
	'chh':{h:0, s:0x091B,f:'chh',t:'ch' ,m:'p'},
	'j'  :{h:0, s:0x091C,f:'j',  t:'j'  ,m:'p'},
	'zh' :{h:0, s:0x091D,f:'zh', t:'jh' ,m:'p'},
	'nj' :{h:0, s:0x091E,f:'nj', t:'ny' ,m:'p'},
	't'  :{h:0, s:0x091F,f:'t',  t:'tt' ,m:'c'}, // cerebral
	'tdh':{h:0, s:0x0920,f:'tdh',t:'tth',m:'c'},
	'd'  :{h:0, s:0x0921,f:'d',  t:'dd' ,m:'c'},
	'dhv':{h:0, s:0x0922,f:'dhv',t:'ddh',m:'c'},
	'tn' :{h:0, s:0x0923,f:'tn', t:'nn' ,m:'c'},
	'tv' :{h:0, s:0x0924,f:'tv', t:'t'  ,m:'d'}, // dental
	'th' :{h:0, s:0x0925,f:'th', t:'th' ,m:'d'},
	'dv' :{h:0, s:0x0926,f:'dv', t:'d'  ,m:'d'},
	'dh' :{h:0, s:0x0927,f:'dh', t:'dh' ,m:'d'},
	'n'  :{h:0, s:0x0928,f:'n',  t:'n'  ,m:'d'},
	'nnn':{h:0, s:0x0929,f:'nnn',t:'nnn',m:'k'}, //-------- skip
	'p'  :{h:0, s:0x092A,f:'p',  t:'p'  ,m:'l'}, // labial
	'ph' :{h:0, s:0x092B,f:'ph', t:'ph' ,m:'l'},
	'b'  :{h:0, s:0x092C,f:'b',  t:'b'  ,m:'l'},
	'bh' :{h:0, s:0x092D,f:'bh', t:'bh' ,m:'l'},
	'm'  :{h:0, s:0x092E,f:'m',  t:'m'  ,m:'l'},
	'y'  :{h:0, s:0x092F,f:'y',  t:'y'  ,m:'v'}, // semi-vowel
	'r'  :{h:0, s:0x0930,f:'r',  t:'r'  ,m:'v'}, // semi-vowel
	'rr' :{h:0, s:0x0931,f:'',   t:'rr' ,m:'v'}, //-------- skip 
	'l'  :{h:0, s:0x0932,f:'l',  t:'l'  ,m:'v'}, // semi-vowel
	'll' :{h:0, s:0x0933,f:'',   t:'ll' ,m:'k'}, //-------- skip
	'lll':{h:0, s:0x0934,f:'',   t:'lll',m:'k'}, //-------- skip
	'w'  :{h:0, s:0x0935,f:'w',  t:'v'  ,m:'v'}, // semi-vowel
	'sh' :{h:0, s:0x0936,f:'sh', t:'sh' ,m:'s'}, // sibilant
	'hsh':{h:0, s:0x0937,f:'hsh',t:'ss' ,m:'s'}, // sibilant
	's'  :{h:0, s:0x0938,f:'s',  t:'s'  ,m:'s'}, // sibilant
	'h'  :{h:0, s:0x0939,f:'h',  t:'h'  ,m:'a'}  // aspirate
};
special['sa'] = [
	{h:0, s:0x0950,f:''  ,t:'om'},
	{h:0, s:0x0964,f:''  ,t:'danda'},
	{h:0, s:0x0965,f:''  ,t:'double danda'}
];
digits['sa'] = [
	{h:0, s:0x0966,f:''  ,t:'0'},
	{h:0, s:0x0967,f:''  ,t:'1'},
	{h:0, s:0x0968,f:''  ,t:'2'},
	{h:0, s:0x0969,f:''  ,t:'3'},
	{h:0, s:0x096A,f:''  ,t:'4'},
	{h:0, s:0x096B,f:''  ,t:'5'},
	{h:0, s:0x096C,f:''  ,t:'6'},
	{h:0, s:0x096D,f:''  ,t:'7'},
	{h:0, s:0x096E,f:''  ,t:'8'},
	{h:0, s:0x096F,f:''  ,t:'9'}
];

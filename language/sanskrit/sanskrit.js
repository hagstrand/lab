vowels['sa'] = [  
	// s:sanscript, d:diacritic, f:filename, t:transliteration
	// h:3 http://sanskritdocuments.org/learning_tutorial_wikner/P005.html (12 vowels)
	// h:2 http://www.tilakpyle.com/sanskrit_alphabet.htm (13 vowels)
	// h:1 http://www.omniglot.com/writing/sanskrit.htm (14 vowels)
	// h:1 http://www.sanskritsounds.com/about-sanskrit/46/index.html 
	// h:0 unicode (19 vowels)
	{h:3, s:0x0905,d:0x0000,f:'a' ,t:'a'},
	{h:3, s:0x0906,d:0x093E,f:'aa',t:'ā'}, 
	{h:3, s:0x0907,d:0x093F,f:'i' ,t:'i'},
	{h:3, s:0x0908,d:0x0940,f:'ii',t:'ī'}, 
	{h:3, s:0x0909,d:0x0941,f:'u' ,t:'u'},
	{h:3, s:0x090A,d:0x0942,f:'uu',t:'ū'}, 
	{h:3, s:0x090B,d:0x0943,f:'r' ,t:'ṛ'},
	{h:1, s:0x0960,d:0x0944,f:''  ,t:'ṝ'},
	{h:3, s:0x090C,d:0x0962,f:'l' ,t:'ḷ'},
	{h:3, s:0x090F,d:0x0947,f:'e' ,t:'e'},
	{h:3, s:0x0910,d:0x0948,f:'ai',t:'ai'},
	{h:3, s:0x0913,d:0x094B,f:'o' ,t:'o'}, 
	{h:3, s:0x0914,d:0x094C,f:'ow',t:'au'}
];
endings['sa'] = [
	{h:0, d:0x0901,f:''  ,t:'n', a:1},
	{h:0, d:0x0902,f:''  ,t:'m', a:1},
	{h:0, d:0x0903,f:''  ,t:'h', a:1}
];
//consonant_endings['sa'] = [
//	{h:0, d:0x094D,f:''  ,t:'virama', a:0}
//];
consonants['sa'] = {
    // http://www.tilakpyle.com/sanskrit_alphabet.htm
	'k'  :{h:0, s:0x0915,f:'k',  t:'k'  ,m:'g'}, // guttural
	'kh' :{h:0, s:0x0916,f:'kh', t:'kh' ,m:'g'},
	'g'  :{h:0, s:0x0917,f:'g',  t:'g'  ,m:'g'},
	'gh' :{h:0, s:0x0918,f:'gh', t:'gh' ,m:'g'},
	'ng' :{h:0, s:0x0919,f:'ng', t:'ṅ' ,m:'g'},
	'ch' :{h:0, s:0x091A,f:'ch', t:'c'  ,m:'p'}, // palatal
	'chh':{h:0, s:0x091B,f:'chh',t:'ch' ,m:'p'},
	'j'  :{h:0, s:0x091C,f:'j',  t:'j'  ,m:'p'},
	'zh' :{h:0, s:0x091D,f:'zh', t:'jh' ,m:'p'},
	'nj' :{h:0, s:0x091E,f:'nj', t:'ñ' ,m:'p'},
	't'  :{h:0, s:0x091F,f:'t',  t:'ṭ' ,m:'c'}, // cerebral
	'tdh':{h:0, s:0x0920,f:'tdh',t:'ṭh',m:'c'},
	'd'  :{h:0, s:0x0921,f:'d',  t:'ḍ' ,m:'c'},
	'dhv':{h:0, s:0x0922,f:'dhv',t:'ḍh',m:'c'},
	'tn' :{h:0, s:0x0923,f:'tn', t:'ṇ' ,m:'c'},
	'tv' :{h:0, s:0x0924,f:'tv', t:'t'  ,m:'d'}, // dental
	'th' :{h:0, s:0x0925,f:'th', t:'th' ,m:'d'},
	'dv' :{h:0, s:0x0926,f:'dv', t:'d'  ,m:'d'},
	'dh' :{h:0, s:0x0927,f:'dh', t:'dh' ,m:'d'},
	'n'  :{h:0, s:0x0928,f:'n',  t:'n'  ,m:'d'},
	'p'  :{h:0, s:0x092A,f:'p',  t:'p'  ,m:'l'}, // labial
	'ph' :{h:0, s:0x092B,f:'ph', t:'ph' ,m:'l'},
	'b'  :{h:0, s:0x092C,f:'b',  t:'b'  ,m:'l'},
	'bh' :{h:0, s:0x092D,f:'bh', t:'bh' ,m:'l'},
	'm'  :{h:0, s:0x092E,f:'m',  t:'m'  ,m:'l'},
	'y'  :{h:0, s:0x092F,f:'y',  t:'y'  ,m:'v'}, // semi-vowel
	'r'  :{h:0, s:0x0930,f:'r',  t:'r'  ,m:'v'}, // semi-vowel
	'l'  :{h:0, s:0x0932,f:'l',  t:'l'  ,m:'v'}, // semi-vowel
	'w'  :{h:0, s:0x0935,f:'w',  t:'v'  ,m:'v'}, // semi-vowel
	'sh' :{h:0, s:0x0936,f:'sh', t:'ś' ,m:'s'}, // sibilant
	'hsh':{h:0, s:0x0937,f:'hsh',t:'ṣ' ,m:'s'}, // sibilant
	's'  :{h:0, s:0x0938,f:'s',  t:'s'  ,m:'s'}, // sibilant
	'h'  :{h:0, s:0x0939,f:'h',  t:'h'  ,m:'a'}  // aspirate
};
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

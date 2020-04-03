vowels['ml'] = [  
	{h:0, s:0x0000,d:0x0000,f:''  ,t:'short a'},
	{h:3, s:0x0D05,d:0x0000,f:'a' ,t:'a'},
	{h:3, s:0x0D06,d:0x0D03,f:'aa',t:'ā'}, 
	{h:3, s:0x0D07,d:0x0D3F,f:'i' ,t:'i'},
	{h:3, s:0x0D08,d:0x0D40,f:'ii',t:'ī'}, 
	{h:3, s:0x0D09,d:0x0D41,f:'u' ,t:'u'},
	{h:3, s:0x0D0A,d:0x0D42,f:'uu',t:'ū'}, 
	{h:3, s:0x0D0B,d:0x0D43,f:'r' ,t:'vocalic&nbsp;r'},
	{h:1, s:0x0D60,d:0x0000,f:''  ,t:'vocalic&nbsp;rr'},
	{h:3, s:0x0D0C,d:0x0000,f:'l' ,t:'vocalic&nbsp;l'},
	{h:2, s:0x0D61,d:0x0000,f:''  ,t:'vocalic&nbsp;ll'},
	{h:0, s:0x0D0D,d:0x0945,f:''  ,t:'candra&nbsp;e'},
	{h:0, s:0x0D0E,d:0x0D46,f:''  ,t:'short&nbsp;e'},
	{h:3, s:0x0D0F,d:0x0D47,f:'e' ,t:'e'},
	{h:3, s:0x0D10,d:0x0D48,f:'ai',t:'ai'},
	{h:0, s:0x0D11,d:0x0949,f:''  ,t:'candra&nbsp;o'}, 
	{h:3, s:0x0D12,d:0x0D4A,f:''  ,t:'short&nbsp;o'}, 
	{h:3, s:0x0D13,d:0x0D4B,f:'o' ,t:'o'}, 
	{h:3, s:0x0D14,d:0x0D4C,f:'ow',t:'au'}
];
endings['ml'] = [
	{h:0, d:0x0D01,f:''  ,t:'an', a:1},
	{h:0, d:0x0D02,f:''  ,t:'am', a:1}, // anusvara
	{h:0, d:0x0D03,f:''  ,t:'ah', a:1}, // visarga
	{h:0, d:0x0D4D,f:''  ,t:'virama', a:0}
];
consonants['ml'] = {
	'k'  :{h:0, s:0x0D15,f:'k',  t:'k'  ,m:'g'}, // guttural
	'kh' :{h:0, s:0x0D16,f:'kh', t:'kh' ,m:'g'},
	'g'  :{h:0, s:0x0D17,f:'g',  t:'g'  ,m:'g'},
	'gh' :{h:0, s:0x0D18,f:'gh', t:'gh' ,m:'g'},
	'ng' :{h:0, s:0x0D19,f:'ng', t:'ng' ,m:'g'},
	'ch' :{h:0, s:0x0D1A,f:'ch', t:'c'  ,m:'p'}, // palatal
	'chh':{h:0, s:0x0D1B,f:'chh',t:'ch' ,m:'p'},
	'j'  :{h:0, s:0x0D1C,f:'j',  t:'j'  ,m:'p'},
	'zh' :{h:0, s:0x0D1D,f:'zh', t:'jh' ,m:'p'},
	'nj' :{h:0, s:0x0D1E,f:'nj', t:'ny' ,m:'p'},
	't'  :{h:0, s:0x0D1F,f:'t',  t:'tt' ,m:'c'}, // cerebral
	'tdh':{h:0, s:0x0D20,f:'tdh',t:'tth',m:'c'},
	'd'  :{h:0, s:0x0D21,f:'d',  t:'dd' ,m:'c'},
	'dhv':{h:0, s:0x0D22,f:'dhv',t:'ddh',m:'c'},
	'tn' :{h:0, s:0x0D23,f:'tn', t:'nn' ,m:'c'},
	'tv' :{h:0, s:0x0D24,f:'tv', t:'t'  ,m:'d'}, // dental
	'th' :{h:0, s:0x0D25,f:'th', t:'th' ,m:'d'},
	'dv' :{h:0, s:0x0D26,f:'dv', t:'d'  ,m:'d'},
	'dh' :{h:0, s:0x0D27,f:'dh', t:'dh' ,m:'d'},
	'n'  :{h:0, s:0x0D28,f:'n',  t:'n'  ,m:'d'},
	'nnn':{h:0, s:0x0D29,f:'nnn',t:'nnn',m:'k'}, //-------- skip
	'p'  :{h:0, s:0x0D2A,f:'p',  t:'p'  ,m:'l'}, // labial
	'ph' :{h:0, s:0x0D2B,f:'ph', t:'ph' ,m:'l'},
	'b'  :{h:0, s:0x0D2C,f:'b',  t:'b'  ,m:'l'},
	'bh' :{h:0, s:0x0D2D,f:'bh', t:'bh' ,m:'l'},
	'm'  :{h:0, s:0x0D2E,f:'m',  t:'m'  ,m:'l'},
	'y'  :{h:0, s:0x0D2F,f:'y',  t:'y'  ,m:'v'}, // semi-vowel
	'r'  :{h:0, s:0x0D30,f:'r',  t:'r'  ,m:'v'}, // semi-vowel
	'rr' :{h:0, s:0x0D31,f:'',   t:'rr' ,m:'v'}, //-------- skip 
	'l'  :{h:0, s:0x0D32,f:'l',  t:'l'  ,m:'v'}, // semi-vowel
	'll' :{h:0, s:0x0D33,f:'',   t:'ll' ,m:'k'}, //-------- skip
	'lll':{h:0, s:0x0D34,f:'',   t:'lll',m:'k'}, //-------- skip
	'w'  :{h:0, s:0x0D35,f:'w',  t:'v'  ,m:'v'}, // semi-vowel
	'sh' :{h:0, s:0x0D36,f:'sh', t:'sh' ,m:'s'}, // sibilant
	'hsh':{h:0, s:0x0D37,f:'hsh',t:'ss' ,m:'s'}, // sibilant
	's'  :{h:0, s:0x0D38,f:'s',  t:'s'  ,m:'s'}, // sibilant
	'h'  :{h:0, s:0x0D39,f:'h',  t:'h'  ,m:'a'}  // aspirate
};
special['ml'] = [
];
digits['ml'] = [
	{h:0, s:0x0D66,f:''  ,t:'0'},
	{h:0, s:0x0D67,f:''  ,t:'1'},
	{h:0, s:0x0D68,f:''  ,t:'2'},
	{h:0, s:0x0D69,f:''  ,t:'3'},
	{h:0, s:0x0D6A,f:''  ,t:'4'},
	{h:0, s:0x0D6B,f:''  ,t:'5'},
	{h:0, s:0x0D6C,f:''  ,t:'6'},
	{h:0, s:0x0D6D,f:''  ,t:'7'},
	{h:0, s:0x0D6E,f:''  ,t:'8'},
	{h:0, s:0x0D6F,f:''  ,t:'9'}
];

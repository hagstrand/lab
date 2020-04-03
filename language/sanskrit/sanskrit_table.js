﻿la = 'sa';
alphabet = [];
alphabet[la] = [
	// p: vowel, abbreviation, ending, consonant, digit
	// u: unicode
	// t: transliteration
	// f: filename
	// m: guttural, palatal, cerebral, dental, labial
	// c: semivowel, sibilant, aspirate
	{p:'v' ,u:0x0905 ,t:'a'  ,f:'a'   ,m:'g' ,c:'' ,b: 8},	// 0 
	{p:'v' ,u:0x0906 ,t:'ā'  ,f:'aa'  ,m:'g' ,c:'' ,b:10},	// 1 
	{p:'v' ,u:0x0907 ,t:'i'  ,f:'i'   ,m:'p' ,c:'' ,b:22},	// 2 
	{p:'v' ,u:0x0908 ,t:'ī'  ,f:'ii'  ,m:'p' ,c:'' ,b:24},	// 3 
	{p:'v' ,u:0x0909 ,t:'u'  ,f:'u'   ,m:'l' ,c:'' ,b:64},	// 4 
	{p:'v' ,u:0x090A ,t:'ū'  ,f:'uu'  ,m:'l' ,c:'' ,b:66},	// 5 
	{p:'v' ,u:0x090B ,t:'ṛ'  ,f:'r'   ,m:'c' ,c:'' ,b:36},	// 6 
	{p:'v' ,u:0x0960 ,t:'ṝ'  ,f:''    ,m:'c' ,c:'' ,b:38},	// 7 
	{p:'v' ,u:0x090C ,t:'ḷ'  ,f:'l'   ,m:'d' ,c:'' ,b:50},	// 8 
	{p:'v' ,u:0x090F ,t:'e'  ,f:'e'   ,m:' ' ,c:'' ,b:12},	// 9 
	{p:'v' ,u:0x0910 ,t:'ai' ,f:'ai'  ,m:' ' ,c:'' ,b:26},	// 10
	{p:'v' ,u:0x0913 ,t:'o'  ,f:'o'   ,m:' ' ,c:'' ,b:40},	// 11
	{p:'v' ,u:0x0914 ,t:'au' ,f:'ow'  ,m:' ' ,c:'' ,b:54},	// 12
	{p:'a' ,u:0x093E ,t:'ā'  ,f:'aa'  ,m:'g' ,c:'' ,b:11},	// 13
	{p:'a' ,u:0x093F ,t:'i'  ,f:'i'   ,m:'p' ,c:'' ,b:23},	// 14
	{p:'a' ,u:0x0940 ,t:'ī'  ,f:'ii'  ,m:'p' ,c:'' ,b:25},	// 15
	{p:'a' ,u:0x0941 ,t:'u'  ,f:'u'   ,m:'l' ,c:'' ,b:65},	// 16
	{p:'a' ,u:0x0942 ,t:'ū'  ,f:'uu'  ,m:'l' ,c:'' ,b:67},	// 17
	{p:'a' ,u:0x0943 ,t:'ṛ'  ,f:'r'   ,m:'c' ,c:'' ,b:37},	// 18
	{p:'a' ,u:0x0944 ,t:'ṝ'  ,f:''    ,m:'c' ,c:'' ,b:39},	// 19
	{p:'a' ,u:0x0962 ,t:'ḷ'  ,f:'l'   ,m:'d' ,c:'' ,b:51},	// 20
	{p:'a' ,u:0x0947 ,t:'e'  ,f:'e'   ,m:' ' ,c:'' ,b:13},	// 21
	{p:'a' ,u:0x0948 ,t:'ai' ,f:'ai'  ,m:' ' ,c:'' ,b:27},	// 22
	{p:'a' ,u:0x094B ,t:'o'  ,f:'o'   ,m:' ' ,c:'' ,b:41},	// 23
	{p:'a' ,u:0x094C ,t:'au' ,f:'ow'  ,m:' ' ,c:'' ,b:55},	// 24
	{p:'e' ,u:0x0901 ,t:'n'  ,f:''    ,m:'d' ,c:'' ,b:56},	// 25
	{p:'e' ,u:0x0902 ,t:'m'  ,f:''    ,m:'l' ,c:'' ,b:70},	// 26
	{p:'e' ,u:0x0903 ,t:'h'  ,f:''    ,m:'g' ,c:'' ,b:14},	// 27
	{p:'c' ,u:0x0915 ,t:'k'  ,f:'k'   ,m:'g' ,c:'' ,b: 1},	// 28
	{p:'c' ,u:0x0916 ,t:'kh' ,f:'kh'  ,m:'g' ,c:'' ,b: 2},	// 29
	{p:'c' ,u:0x0917 ,t:'g'  ,f:'g'   ,m:'g' ,c:'' ,b: 3},	// 30
	{p:'c' ,u:0x0918 ,t:'gh' ,f:'gh'  ,m:'g' ,c:'' ,b: 4},	// 31
	{p:'c' ,u:0x0919 ,t:'ṅ'  ,f:'ng'  ,m:'g' ,c:'' ,b: 5},	// 32
	{p:'c' ,u:0x091A ,t:'c'  ,f:'ch'  ,m:'p' ,c:'' ,b:15},	// 33
	{p:'c' ,u:0x091B ,t:'ch' ,f:'chh' ,m:'p' ,c:'' ,b:16},	// 34
	{p:'c' ,u:0x091C ,t:'j'  ,f:'j'   ,m:'p' ,c:'' ,b:17},	// 35
	{p:'c' ,u:0x091D ,t:'jh' ,f:'zh'  ,m:'p' ,c:'' ,b:18},	// 36
	{p:'c' ,u:0x091E ,t:'ñ'  ,f:'nj'  ,m:'p' ,c:'' ,b:19},	// 37
	{p:'c' ,u:0x091F ,t:'ṭ'  ,f:'t'   ,m:'c' ,c:'' ,b:29},	// 38
	{p:'c' ,u:0x0920 ,t:'ṭh' ,f:'tdh' ,m:'c' ,c:'' ,b:30},	// 39
	{p:'c' ,u:0x0921 ,t:'ḍ'  ,f:'d'   ,m:'c' ,c:'' ,b:31},	// 40
	{p:'c' ,u:0x0922 ,t:'ḍh' ,f:'dhv' ,m:'c' ,c:'' ,b:32},	// 41
	{p:'c' ,u:0x0923 ,t:'ṇ'  ,f:'tn'  ,m:'c' ,c:'' ,b:33},	// 42
	{p:'c' ,u:0x0924 ,t:'t'  ,f:'tv'  ,m:'d' ,c:'' ,b:43},	// 43
	{p:'c' ,u:0x0925 ,t:'th' ,f:'th'  ,m:'d' ,c:'' ,b:44},	// 44
	{p:'c' ,u:0x0926 ,t:'d'  ,f:'dv'  ,m:'d' ,c:'' ,b:45},	// 45
	{p:'c' ,u:0x0927 ,t:'dh' ,f:'dh'  ,m:'d' ,c:'' ,b:46},	// 46
	{p:'c' ,u:0x0928 ,t:'n'  ,f:'n'   ,m:'d' ,c:'' ,b:47},	// 47
	{p:'c' ,u:0x092A ,t:'p'  ,f:'p'   ,m:'l' ,c:'' ,b:57},	// 48
	{p:'c' ,u:0x092B ,t:'ph' ,f:'ph'  ,m:'l' ,c:'' ,b:58},	// 49
	{p:'c' ,u:0x092C ,t:'b'  ,f:'b'   ,m:'l' ,c:'' ,b:59},	// 50
	{p:'c' ,u:0x092D ,t:'bh' ,f:'bh'  ,m:'l' ,c:'' ,b:60},	// 51
	{p:'c' ,u:0x092E ,t:'m'  ,f:'m'   ,m:'l' ,c:'' ,b:61},	// 52
	{p:'c' ,u:0x092F ,t:'y'  ,f:'y'   ,m:'p' ,c:'v',b:20},	// 53
	{p:'c' ,u:0x0930 ,t:'r'  ,f:'r'   ,m:'r' ,c:'v',b:34},	// 54
	{p:'c' ,u:0x0932 ,t:'l'  ,f:'l'   ,m:'d' ,c:'v',b:48},	// 55
	{p:'c' ,u:0x0935 ,t:'v'  ,f:'w'   ,m:'l' ,c:'v',b:62},	// 56
	{p:'c' ,u:0x0936 ,t:'ś'  ,f:'sh'  ,m:'p' ,c:'s',b:21},	// 57
	{p:'c' ,u:0x0937 ,t:'ṣ'  ,f:'hsh' ,m:'c' ,c:'s',b:35},	// 58
	{p:'c' ,u:0x0938 ,t:'s'  ,f:'s'   ,m:'d' ,c:'s',b:49},	// 59
	{p:'c' ,u:0x0939 ,t:'h'  ,f:'h'   ,m:'g' ,c:'a',b: 7},	// 60
	{p:'d' ,u:0x0966 ,t:'0'  ,f:''    ,m:''  ,c:'' ,b: 0},	// 61
	{p:'d' ,u:0x0967 ,t:'1'  ,f:''    ,m:''  ,c:'' ,b: 0},	// 62
	{p:'d' ,u:0x0968 ,t:'2'  ,f:''    ,m:''  ,c:'' ,b: 0},	// 63
	{p:'d' ,u:0x0969 ,t:'3'  ,f:''    ,m:''  ,c:'' ,b: 0},	// 64
	{p:'d' ,u:0x096A ,t:'4'  ,f:''    ,m:''  ,c:'' ,b: 0},	// 65
	{p:'d' ,u:0x096B ,t:'5'  ,f:''    ,m:''  ,c:'' ,b: 0},	// 66
	{p:'d' ,u:0x096C ,t:'6'  ,f:''    ,m:''  ,c:'' ,b: 0},	// 67
	{p:'d' ,u:0x096D ,t:'7'  ,f:''    ,m:''  ,c:'' ,b: 0},	// 68
	{p:'d' ,u:0x096E ,t:'8'  ,f:''    ,m:''  ,c:'' ,b: 0},	// 69
	{p:'d' ,u:0x096F ,t:'9'  ,f:''    ,m:''  ,c:'' ,b: 0}, 	// 70
	{p:'d' ,u:0x096F ,t:'9'  ,f:''    ,m:''  ,c:'' ,b: 0} 	// 70
];                                                      
                                                                                                                                                                                                                                                                                                                                                                                                        
                                                        
                                                        
                                                        
                                                        
                                                        
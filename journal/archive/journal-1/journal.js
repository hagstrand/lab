function Journal() {
	this.token = null;
}
Journal.xmlstring = ''+
	'<request>'+
		'<action>insert</action>'+
		'<id>0</id>'+
		'<version>0</version>'+
		'<token>@token@</token>'+
		'<author>@feeling@</author>'+
		'<abstract><![CDATA[@story@]]></abstract>'+
		'<when>@time@</when>'+
		'<datatype>12</datatype>'+
		'<headline><![CDATA[]]></headline>'+
	'</request>';
Journal.prototype = {
	setup: function() {
		this.token = '4a860f1fab2d8a6b3d9f7172cf3f21e1';
		this.ads = Journal.ads;
		var self = this;
		jgh.$('tfeeling').onchange = function() {self.onFeeling()};
		this.showAd();
	},
	onFeeling: function() {
		var feeling = jgh.$('tfeeling').options[jgh.$('tfeeling').selectedIndex].value;
	},
	showAd: function() {
		var ad = this.getAd();
		jgh.$('ad').innerHTML = ad;
	},
	getAd: function() {
		var ndx = parseInt(Math.random() * this.ads.length);
		var ad = this.ads[ndx];
		var s = 'Buy from Amazon<br/>' + ad.copy + '<br/>by ' + ad.author;
		return s;
	},
	 /** Event Handler.  Called when the user clicks the save button.
	 * Call composeXml to gather data entered on all the tabs, including hierarchy.
	 * @event
	 */
	post: function() {
		var tfeeling = jgh.$('tfeeling').value;
		var tstory = jgh.$('tstory').value;

		var s = this.composeXml(tfeeling, tstory);
		var self = this;
		this.updater.post(s, function( response, req) {self.onPostReturn(response, req);});
//		opener.postMessage("post ", "*");
	},
	onPostReturn: function(response,req) {
//		alert(response);
		this.close();
	},
	cancel: function() {
		this.close();
	},
	close: function() {
		opener.postMessage("close", "*");
	},
	/**
	 * Compose the XML to update the record based on the user's changes.
	 */
	composeXml: function(feeling, story) {
		var s = Journal.xmlstring;
		s = s.replace('@token@', this.token);
		s = s.replace('@feeling@', feeling);
		s = s.replace('@story@', story);

		var wb = new When( new Date(), When.SECOND);  // current time
		var time = wb.format("detail");
		s = s.replace('@time@', time);
		return s;
	},
	log: function(msg) {
		console.log(msg);
	}
}

Journal.ads = [
	{
		id: 1,
		author:'Eckhart Tolle',
		title: 'A New Earth: Awakening to Your Life\'s Purpose',
		copy:'<a href="http://www.amazon.com/gp/product/0452289963?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0452289963">A New Earth: Awakening to Your Life\'s Purpose (Oprah\'s Book Club, Selection 61)</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=0452289963" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 2,
		author:'Eckhart Tolle',
		title: 'The Power of Now: A Guide to Spiritual Enlightenment',
		copy:  '<a href="http://www.amazon.com/gp/product/1577314808?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1577314808">The Power of Now: A Guide to Spiritual Enlightenment</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=1577314808" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 3,
		author:'Don Ruiz',
		title: 'The Four Agreements: A Practical Guide to Personal Freedom',
		copy:  '<a href="http://www.amazon.com/gp/product/1878424505?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1878424505">The Four Agreements: A Practical Guide to Personal Freedom, A Toltec Wisdom Book</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=1878424505" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 4,
		author:'Wayne Dyer',		
		title: 'Excuses Begone!: How to Change Lifelong, Self-Defeating Thinking Habits',
		copy:  '<a href="http://www.amazon.com/gp/product/1401922945?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1401922945">Excuses Begone!: How to Change Lifelong, Self-Defeating Thinking Habits</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=1401922945" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 5,
		author:'Wayne Dyer',		
		title: 'The Power of Intention',
		copy:  '<a href="http://www.amazon.com/gp/product/1401902162?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1401902162">The Power of Intention</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=1401902162" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 6,
		author:'Louise Hay',
		title: 'You Can Heal Your Life',
		copy:  '<a href="http://www.amazon.com/gp/product/0937611018?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0937611018">You Can Heal Your Life</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=0937611018" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 7,
		author:'Christiane Northrup',
		title: 'Women\'s Bodies, Women\'s Wisdom (Revised Edition): Creating Physical and Emotional Health and Healing',
		copy:  '<a href="http://www.amazon.com/gp/product/0553386735?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0553386735">Women\'s Bodies, Women\'s Wisdom (Revised Edition): Creating Physical and Emotional Health and Healing</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=0553386735" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 8,
		author:'Dalai Lama',
		title: 'The Art of Happiness, 10th Anniversary Edition: A Handbook for Living',
		copy:  '<a href="http://www.amazon.com/gp/product/1594488894?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1594488894">The Art of Happiness, 10th Anniversary Edition: A Handbook for Living</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=1594488894" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 9,
		author:'Michael Beckwith',
		title: 'Spiritual Liberation: Fulfilling Your Soul\'s Potential',
		copy:  '<a href="http://www.amazon.com/gp/product/1582702055?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1582702055">Spiritual Liberation: Fulfilling Your Soul\'s Potential</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=1582702055" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 10,
		author:'Thich Nhat Hanh',
		title: 'The Miracle of Mindfulness',
		copy:  '<a href="http://www.amazon.com/gp/product/0807012394?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0807012394">The Miracle of Mindfulness</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=0807012394" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 11,
		author:'Byron Katie',
		title: 'Loving What Is: Four Questions That Can Change Your Life',
		copy:  '<a href="http://www.amazon.com/gp/product/1400045371?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1400045371">Loving What Is: Four Questions That Can Change Your Life</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=1400045371" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	},
	{
		id: 12,
		author:'Arundhati Roy',
		title: 'The God of Small Things: A Novel',
		copy:  '<a href="http://www.amazon.com/gp/product/0812979656?ie=UTF8&tag=voyc-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0812979656">The God of Small Things: A Novel</a><img src="http://www.assoc-amazon.com/e/ir?t=voyc-20&l=as2&o=1&a=0812979656" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
		keywords:''
	}
]

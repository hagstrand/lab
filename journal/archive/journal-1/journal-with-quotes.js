function Journal() {
}
Journal.prototype = {
	setup: function() {
		this.tips = Journal.tips;
		this.ads = Journal.ads;
		var self = this;
		jgh.$('tfeeling').onchange = function() {self.onFeeling()};
	},
	onFeeling: function() {
		var feeling = jgh.$('tfeeling').options[jgh.$('tfeeling').selectedIndex].value;
		var tip = this.getTip(feeling);
		var ad = this.getAd(feeling);
		jgh.$('message').innerHTML = tip.msg + "<br/>   - " + tip.author;
		jgh.$('ad').innerHTML = ad.text;
	},
	getTip: function(feeling) {
		var tipobject = this.tips[feeling];
		var tip = tipobject.tips[tipobject.ndx];
		tipobject.ndx++;
		if (!tipobject.tips[tipobject.ndx]) {
			tipobject.ndx = 0;
		}
		return tip;
	},
	getAd: function(feeling) {
		var ad = this.ads[0];
		return ad;
	},
	 /** Event Handler.  Called when the user clicks the save button.
	 * Call composeXml to gather data entered on all the tabs, including hierarchy.
	 * @event
	 */
	post: function() {
		var tdate = new Date();
		var tfeeling = jgh.$('tfeeling').value;
		var tfood = jgh.$('tfood').value;
		var tactivity = jgh.$('tactivity').value;
		var tthoughts = jgh.$('tthoughts').value;
		var tstory = jgh.$('tstory').value;
		var s = tdate+' :: '+tfeeling+' :: '+tstory+' :: '+tfood+' :: '+tactivity+' :: '+tthoughts;

//		var dom = this.composeXml();
//		var s = this.serialize(dom);
//		//document.getElementById('xmlbox').value = s;
//		var self = this;
//		this.updater.post(s, function( response, req) {self.onReturn(response, req);});

//		opener.postMessage("close", "*");
//		opener.postMessage(" post: " + s, "*");
		this.log(" post: " + s);
//		this.close();
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
	composeXml: function() {
		// create empty output dom
		var dom = document.implementation.createDocument("","",null);
		var xml = dom.createElement("request");
		dom.appendChild(xml);
		
		// set version
		var v, e, t;
		v = "0";
		e = dom.createElement("version");
		xml.appendChild(e);
		t = dom.createTextNode(v);
		e.appendChild(t);

		// set story
		v = jgh.$('tcomment').value;
		e = dom.createElement("abstract");
		xml.appendChild(e);
		t = dom.createTextNode(v);
		e.appendChild(t);

		// set time
		v = new Date();
		e = dom.createElement("begin");
		xml.appendChild(e);
		t = dom.createTextNode(v);
		e.appendChild(t);
		e = dom.createElement("end");
		xml.appendChild(e);
		t = dom.createTextNode(v);
		e.appendChild(t);

		// imageurl
		// author

		// get coordinates


		v += latlngs[i].x + " " + latlngs[i].y;
		v = "MULTIPOLYGON(((" + v + ")))";

		e = dom.createElement("geometry");
		xml.appendChild(e);
		t = dom.createTextNode(v);
		e.appendChild(t);

		return dom;
	},
	log: function(msg) {
		console.log(msg);
	}
}

Journal.tips = {
	1000: {  // enlightenment
		ndx: 0, 
		tips: [
			{
				msg: "No one who has lived even for a fleeting moment for something other than life in its conventional sense and has experienced the exaltation that this feeling produces can then renounce his new freedom so easily.",
				author: "Andre Breton"
			},
			{
				msg: "If I could define enlightenment briefly I would say it is the quiet acceptance of what is.",
				author: "Wayne Dyer"
			},
			{
				msg: "Enlightenment is a sublime word, if one goes back to its meaning; it means illumination of the spirit through truth, liberation from the shadows of error, or uncertainty, of doubt. Enlightenment is, in its deepest meaning, the transfiguration.",
				author: "Paul Leopold Haffner"
			}
		]
	},
	600: { // peace
		ndx: 0,
		tips: [
			{
				msg: "We look forward to the time when the Power of Love will replace the Love of Power.  Then will our world know the blessings of peace.",
				author: "William Ewart Gladstone"
			},
			{
				msg: "If we have no peace, it is because we have forgotten that we belong to each other.",
				author: "Mother Teresa"
			},
			{
				msg: "Peace cannot be achieved through violence, it can only be attained through understanding.",
				author: "Ralph Waldo Emerson"
			}
		]
	},
	540: { // joy
		ndx: 0, 
		tips: [
			{
				msg: "One joy scatters a hundred grieves.",
				author: "Chinese Proverb"
			},
			{
				msg: "In this world, full often, our joys are only the tender shadows which our sorrows cast.",
				author: "Henry Ward Beecher"
			},
			{
				msg: "I have no greater joy then to hear that my children walk in truth. John 4",
				author: "Bible"
			}
		]
	},
	500: { // love
		ndx: 0, 
		tips: [
			{
				msg: "The hunger for love is much more difficult to remove than the hunger for bread. ",
				author: "Mother Teresa"
			},
			{
				msg: "Gravitation is not responsible for people falling in love. ",
				author: "Albert Einstein"
			},
			{
				msg: "There is no surprise more magical than the surprise of being loved.  It is God's finger on man's shoulder. ",
				author: "Charles Morgan"
			}
		]
	},
	400: { // reason
		ndx: 0, 
		tips: [
			{
				msg: "Reason lies between the bridle and the spur.",
				author: "Italian Proverb"
			},
			{
				msg: "Reason is the wise man's guide, example the fool's.",
				author: "Proverb"
			},
			{
				msg: "Reason itself is fallible, and this fallibility must find a place in our logic.",
				author: "Nicola Abbagnano"
			}
		]
	},
	350: { // acceptance
		ndx: 0, 
		tips: [
			{
				msg: "Acceptance is the truest kinship with humanity.",
				author: "G.K. Chesterton"
			},
			{
				msg: "Acceptance of one's life has nothing to do with resignation; it does not mean running away from the struggle.  On the contrary it means accepting it as it comes. . . .  To accept is to say yes to life in its entirety.",
				author: "Paul Tournier"
			},
			{
				msg: "Some people confuse acceptance with apathy but there's all the difference in the world.  Apathy fails to distinguish what can and cannot be helped; acceptance makes the distinction. Apathy paralyzes the will-to-action; acceptance frees it by relieving it of impossible burdens.",
				author: "Arthur Gordon"
			}
		]
	},
	310: { // willingness
		ndx: 0, 
		tips: [
			{
				msg: "What we call the secret of happiness is no more a secret than our willingness to choose life.",
				author: "Merlin Olsen"
			},
			{
				msg: "Perseverance isn't just the willingness to work hard. It's that, plus the willingness to be stubborn about your own belief in yourself.",
				author: "Honore de Balzac"
			},
			{
				msg: "There is no such thing as a great talent without a great willpower.",
				author: "Harold Taylor"
			}
		]
	},
	250: { // neutrality
		ndx: 0, 
		tips: [
			{
				msg: "If we keep an open mind, too much is likely to fall into it.",
				author: "Natalie Clifford Barney"
			},
			{
				msg: "Impartial. Unable to perceive any promise of personal advantage from espousing either side of a controversy.",
				author: "Ambrose Bierce"
			},
			{
				msg: "What people call impartiality may simply mean indifference, and what people call partiality may simply mean mental activity.",
				author: "G. K. Chesterton"
			}
		]
	},
	200: { // courage
		ndx: 0, 
		tips: [
			{
				msg: "Some have been thought brave because they didn't have the courage to run away.",
				author: "Proverb"
			},
			{
				msg: "Courage and perseverance have a magical talisman, before which difficulties disappear and obstacles vanish into air.",
				author: "John Quincy Adams"
			},
			{
				msg: "Courage that grows from constitution often forsakes a man when he has occasion for it; courage which arises from a sense of duty acts ;in a uniform manner.",
				author: "Joseph Addison"
			}
		]
	},
	175: { // pride
		ndx: 0, 
		tips: [
			{
				msg: "The nobler the blood the less the pride.",
				author: "Danish proverb"
			},
			{
				msg: "You cannot hold your head high with your hand out.",
				author: "Yiddish Proverb"
			},
			{
				msg: "Pride is the mask of one's own faults.",
				author: "Yiddish Proverb"
			}
		]
	},
	150 : { // anger
		ndx: 0, 
		tips: [
			{
				msg: "If you are patient in one moment of anger, you will escape a hundred days of sorrow.",
				author: "Chinese Proverb"
			},
			{
				msg: "Anger is not only inevitable, but it is necessary. For in its place is indifference, the worst of all human qualities.",
				author: "Anonymous"
			},
			{
				msg: "He who is slow to anger has great understanding, but he who has a hasty temper exalts folly.",
				author: "Proverb"
			}
		]
	},
	125: { // desire
		ndx: 0, 
		tips: [
			{
				msg: "There are no better masters than poverty and wants.",
				author: "Danish proverb"
			},
			{
				msg: "More than we use is more than we want.",
				author: "Scottish Proverb"
			},
			{
				msg: "First deserve then desire.",
				author: "Proverb"
			}
		]
	},
	100: { // fear
		ndx: 0, 
		tips: [
			{
				msg: "Fear less, hope more; eat less, chew more; whine less breathe more; talk less, say more; hate less, love more; and all good things are yours.",
				author: "Swedish Proverb"
			},
			{
				msg: "According to legend, one day a man was wandering in the desert when he met Fear and Plague. They said they were on their way to a large city where they were going to kill 10,000 people. The man asked Plague if he was going to do all the work. Plague smiled and said, No, I'll only take care of a few hundred. I'll let my friend Fear do the rest.",
				author: "Anonymous"
			},
			{
				msg: "He who fears to suffer, suffers from fear.",
				author: "Proverb"
			}
		]
	},
	75: { // grief
		ndx: 0, 
		tips: [
			{
				msg: "All things grow with time -- except grief.",
				author: "Yiddish Proverb"
			},
			{
				msg: "Time heals old pain, while it creates new ones.",
				author: "Proverb"
			},
			{
				msg: "Grief is light that is capable of counsel.",
				author: "Proverb"
			}
		]
	},
	50: { // apathy
		ndx: 0, 
		tips: [
			{
				msg: "These are days when no one should rely unduly on his competence. Strength lies in improvisation. All the decisive blows are struck left-handed.",
				author: "Walter Benjamin"
			},
			{
				msg: "I have a very strong feeling that the opposite of love is not hate -- it's apathy. It's not giving a damn.",
				author: "Leo Buscaglia"
			},
			{
				msg: "Scientists announced today that they have discovered a cure for apathy. However, they claim no one has shown the slightest interest in it.",
				author: "George Carlin"
			}
		]
	},
	30: { // guilt
		ndx: 0, 
		tips: [
			{
				msg: "He who is present at a wrongdoing and does not lift a hand to prevent it, is as guilty as the wrongdoers.",
				author: "American Indian Proverb"
			},
			{
				msg: "He who flees judgment confesses his guilt.",
				author: "Anonymous"
			},
			{
				msg: "He declares himself guilty who justifies himself before accusation.",
				author: "Proverb"
			}
		]
	},
	20: { // shame
		ndx: 0, 
		tips: [
			{
				msg: "Shame is worse than death.",
				author: "Proverb"
			},
			{
				msg: "Oh! no! we never mention her, her name is never heard; my lips are now forbid to speak, that once familiar word.",
				author: "Thomas Haynes Bayly"
			},
			{
				msg: "Old maids sweeten their tea with scandal.",
				author: "Josh Billings"
			}
		]
	}
}

Journal.ads = [
	'Join Wayne Dyer in his home on Maui for his seminar <i>The Shift</i>. <a href="future">www.dyer.com/seminar',
	'Hear Louise Hay speaking in Encinitas this Sunday. <a href="future">www.seaside.com</a>'
]

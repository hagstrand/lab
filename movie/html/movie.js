function Movie() {
	this.criteria = {};
	this.sort = 'alpha';
	this.stack = [];
	this.folder = 'D:\\John\\media\\movies\\';
}

Movie.prototype = {
	setup: function() {
		appendScript("svc/title.js");
		appendScript("svc/director.js");
		appendScript("svc/writer.js");
		appendScript("svc/actor.js");
		appendScript("svc/keyword.js");
		this.showList('keyword');
		
		$('detailfilename').addEventListener('click',function(evt) {
			prompt("Copy to clipboard: Ctrl+C", g.movie.folder + evt.target.innerHTML);
		});
	},
	layout : function(resizing) {
		// I got everything to work in CSS except for these two heights.
		var ht = $('titlecontainer').offsetHeight - $('titleheader').offsetHeight;
		$('titlelist').style.height = ht + 'px';
		
		var ht = $('listcontainer').offsetHeight - $('menu').offsetHeight;
		$('list').style.height = ht + 'px';
		return;
	},
	onTitleLoaded: function() {
		this.drawTitles();
	},
	onDirectorLoaded: function() {
		this.drawDirectors();
	},
	onWriterLoaded: function() {
		this.drawWriters();
	},
	onActorLoaded: function() {
		this.drawActors();
	},
	onKeywordLoaded: function() {
		this.drawKeywords();
	},
	titleIsQualified: function(title) {
		var qualified = true;
		if (this.criteria.director) {
			if (title.director.indexOf(this.criteria.director) < 0) {
				qualified = false;
			}
		}
		if (this.criteria.writer) {
			if (title.writer.indexOf(this.criteria.writer) < 0) {
				qualified = false;
			}
		}
		if (this.criteria.actor) {
			if (title.actor.indexOf(this.criteria.actor) < 0) {
				qualified = false;
			}
		}
		if (this.criteria.keyword) {
			if (title.keyword.indexOf(this.criteria.keyword) < 0) {
				qualified = false;
			}
		}
		return qualified;
	},
	drawTitles: function() {
		var bCriteria = this.drawNowShowing();
		$('showall').style.display = (bCriteria) ? 'inline' : 'none';
		$('backbutton').disabled = (!bCriteria && this.stack.length <= 0) ? true : false;
		
		var atitle = [];
		for (var x in g.title) {
			var title = g.title[x];
			if (this.titleIsQualified(title)) {
				atitle.push(title);
			}
		}

		if (this.sort == 'year') {
			atitle.sort(function(a,b) {
				return a.year - b.year;
			});
		} else if (this.sort == 'language') {
			atitle.sort(function(a,b) {
				var x = a.language.localeCompare(b.language);
				if (!x) {
					x = a.name.localeCompare(b.name);
				}
				return x;
			});
		} else if (this.sort == 'ort') {
			atitle.sort(function(a,b) {
				x = a.ort - b.ort;
				if (!x) {
					x = a.name.localeCompare(b.name);
				}
				return x;
			});
		} else if (this.sort == 'rating') {
			atitle.sort(function(a,b) {
				x = b.rating - a.rating;
				if (!x) {
					x = a.name.localeCompare(b.name);
				}
				return x;
			});
		}

		var s = '';
		for (var x in atitle) {
			var title = atitle[x];
			s += '<div class="titlerow">';

			if (this.sort == 'alpha') {
				s += '<a href="#" onclick="g.movie.setTitle(\''+title.id+'\')">' + title.name+'</a>';
				s += '&nbsp;&nbsp;('+title.year+')';
				s += '&nbsp;&nbsp;'+title.language;
				s += '&nbsp;&nbsp;'+title.ort+'m';
				s += '&nbsp;&nbsp;'+'<span class="rating">'+this.composeRating(title.rating)+'</span>';
			}
			else if (this.sort == 'year') {
				s += '('+title.year+')';
				s += '&nbsp;&nbsp;<a href="#" onclick="g.movie.setTitle(\''+title.id+'\')">' + title.name+'</a>';
				s += '&nbsp;&nbsp;'+title.language;
				s += '&nbsp;&nbsp;'+title.ort+'m';
				s += '&nbsp;&nbsp;'+'<span class="rating">'+this.composeRating(title.rating)+'</span>';
			}
			else if (this.sort == 'language') {
				s += title.language;
				s += '&nbsp;&nbsp;<a href="#" onclick="g.movie.setTitle(\''+title.id+'\')">' + title.name+'</a>';
				s += '&nbsp;&nbsp;'+'('+title.year+')';
				s += '&nbsp;&nbsp;'+title.ort+'m';
				s += '&nbsp;&nbsp;'+'<span class="rating">'+this.composeRating(title.rating)+'</span>';
			}
			else if (this.sort == 'ort') {
				s += title.ort+'m';
				s += '&nbsp;&nbsp;<a href="#" onclick="g.movie.setTitle(\''+title.id+'\')">' + title.name+'</a>';
				s += '&nbsp;&nbsp;'+'('+title.year+')';
				s += '&nbsp;&nbsp;'+title.language;
				s += '&nbsp;&nbsp;'+'<span class="rating">'+this.composeRating(title.rating)+'</span>';
			}
			else if (this.sort == 'rating') {
				s += '&nbsp;&nbsp;'+'<span class="rating">'+this.composeRating(title.rating)+'</span>';
				s += '&nbsp;&nbsp;<a href="#" onclick="g.movie.setTitle(\''+title.id+'\')">' + title.name+'</a>';
				s += '&nbsp;&nbsp;'+'('+title.year+')';
				s += '&nbsp;&nbsp;'+title.language;
				s += '&nbsp;&nbsp;'+title.ort+'m';
			}
			s += '</div>';
		}
		$('titlelist').innerHTML = s;
	},
	getTitleById: function(id) {
		for (var x in g.title) {
			var title = g.title[x];
			if (title.id == id) {
				return title;
			}
		}
		return null;
	},
	closeDetail: function() {
		$('detail').style.display = 'none';
	},
	setTitle: function(id) {
		this.criteria['title'] = id;
		this.pushCriteria('title', id);
		
		// open detail window
		$('detail').style.display = 'block';

		// compose text
		var title = this.getTitleById(id);
		
		var keywordlinks = '';
		var akeyword = title.keyword.split(',');
		for (var y in akeyword) {
			var keyword = akeyword[y];
			keyword = keyword.trim();
			if (keywordlinks) {
				keywordlinks += ', ';
			}
			keywordlinks += '<a href="javascript:;" onclick="g.movie.setKeyword(\''+keyword+'\');return(false);">' + keyword + '</a>';
		}

		var directorlinks = '';
		var adirector = title.director.split(',');
		for (var y in adirector) {
			var director = adirector[y];
			director = director.trim();
			if (directorlinks) {
				directorlinks += ', ';
			}
			directorlinks += '<a href="#" onclick="g.movie.setDirector(\''+director+'\')">' + director + '</a>';
		}

		var writerlinks = '';
		var awriter = title.writer.split(',');
		for (var y in awriter) {
			var writer = awriter[y];
			writer = writer.trim();
			if (writerlinks) {
				writerlinks += ', ';
			}
			writerlinks += '<a href="#" onclick="g.movie.setWriter(\''+writer+'\')">' + writer + '</a>';
		}

		var actorlinks = '';
		var aactor = title.actor.split(',');
		for (var y in aactor) {
			var actor = aactor[y];
			actor = actor.trim();
			if (actorlinks) {
				actorlinks += ', ';
			}
			actorlinks += '<a href="#" onclick="g.movie.setActor(\''+actor+'\')">' + actor + '</a>';
		}

		$('detailtitle').innerHTML = title.name;
		$('detailyear').innerHTML = title.year;
		$('detaillanguage').innerHTML = title.language;
		$('detailort').innerHTML = title.ort;
		$('detailkeywords').innerHTML = keywordlinks;
		$('detailplot').innerHTML = title.plot;
		$('detaildirector').innerHTML = directorlinks;
		$('detailwriter').innerHTML = writerlinks;
		$('detailactor').innerHTML = actorlinks;
		$('detailcomment').innerHTML = title.comment;
		$('detailimdb').href = 'http://www.imdb.com/title/' + title.imdbkey + '/';
		$('detailfilename').innerHTML = title.filename;	
		$('detailrating').innerHTML = this.composeRating(title.rating);
	},
	composeRating: function(rating) {
		var sRating = '';
		for (var i=0; i<rating; i++) {
			sRating += '&#9733;'; // '&#9734;'; //'*';
		}
		return sRating;
	},
	setDirector: function(director) {
		this.setCriteria('director', director);
	},
	setWriter: function(writer) {
		this.setCriteria('writer', writer);
	},
	setActor: function(actor) {
		this.setCriteria('actor', actor);
	},
	setKeyword: function(keyword) {
		this.setCriteria('keyword', keyword);
	},
	setCriteria: function(key, value) {
		this.pushCriteria(key, value);
		this.closeDetail();
		this.criteria = {};
		this.criteria[key] = value;
		this.drawTitles();
	},
	pushCriteria: function(key, value) {
		this.stack.push({'key':key, 'value':value});
	},
	popCriteria: function() {
		var o = this.stack.pop();
		if (o && this.criteria[o.key] == o.value) {
			o = this.stack.pop();
		} 
		this.criteria = {};
		if (o) {
			this.criteria[o.key] = o.value;
		}		
		return;
	},
	back: function(source) {
		if (source == 'detail') {
			this.closeDetail();
		}
		this.popCriteria();
		if (this.criteria['title']) {
			this.setTitle(this.criteria['title']);
		}
		else {
			this.drawTitles();
		}
	},
	showAll: function() {
		this.criteria = {};
		this.drawTitles();
	},
	drawNowShowing: function() {
		var s = '';
		var ux;
		for (var x in this.criteria) {
			ux = x.substring(0,1).toUpperCase() + x.substring(1); // capitalize
			s += ux + ': ' + this.criteria[x];
		}
		var bDrawn = true;
		if (!s) {
			s = 'All Titles';
			bDrawn = false;
		}
		$('nowshowing').innerHTML = s;
		return bDrawn;
	},
	drawDirectors: function() {
		var s = '';
		for (var x in g.director) {
			s += '<a href="#" onclick="g.movie.setDirector(\''+g.director[x].name+'\')">' + g.director[x].name + '</a><br/>';
		}
		$('directorlist').innerHTML = s;
	},
	drawWriters: function() {
		var s = '';
		for (var x in g.writer) {
			s += '<a href="#" onclick="g.movie.setWriter(\''+g.writer[x].name+'\')">' + g.writer[x].name + '</a><br/>';
		}
		$('writerlist').innerHTML = s;
	},
	drawActors: function() {
		var s = '';
		for (var x in g.actor) {
			s += '<a href="#" onclick="g.movie.setActor(\''+g.actor[x].name+'\')">' + g.actor[x].name + '</a><br/>';
		}
		$('actorlist').innerHTML = s;
	},
	drawKeywords: function() {
		var s = '';
		for (var x in g.keyword) {
			s += '<a href="javascript:;" onclick="g.movie.setKeyword(\''+g.keyword[x].name+'\');return(false);">' + g.keyword[x].name + '</a><br/>';
		}
		$('keywordlist').innerHTML = s;
	},
	showList: function(listname) {
		var lists = ['director', 'writer', 'actor', 'keyword']
		for (var x in lists) {
			$(lists[x]+'list').style.display = 'none';
		}
		$(listname+'list').style.display = 'block';
	},
	setSort: function(sort) {
		this.sort = sort;
		this.drawTitles();
	}
}

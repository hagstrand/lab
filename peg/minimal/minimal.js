/* 
	class Minimal
*/
Minimal = function() {
	// is singleton
	if ( arguments.callee._singletonInstance )
		return arguments.callee._singletonInstance;
	arguments.callee._singletonInstance = this;

	this.theme = '';
	this.popup = null;
}

Minimal.prototype = {
	attachAll: function(e) {
		this.fixInitiallyHidden(e);
		this.attachShowHide(e);
		this.attachExpanders(e);
		this.attachOpenClose(e);
		this.attachToggleButtons(e);
		this.attachCssButtons(e);
		this.attachSelect(e);
		this.attachDnd(e);
	},

	fixInitiallyHidden: function(element) {
		var elem = element || document;
		var elems = elem.querySelectorAll('[initially]');
		for (var i=0; i<elems.length; i++) {
			elems[i].removeAttribute('initially');
			elems[i].removeAttribute('hidden');
		}
	},

	attachShowHide: function(element) {
		var elem = element || document;
		var elems = elem.querySelectorAll('[show]');
		for (var i=0; i<elems.length; i++) {
			elems[i].addEventListener('click', function(event) {
				var d = event.currentTarget;
				var f = d.getAttribute('show');
				var b = $(f).hasAttribute('hidden');
				if (b) {
					$(f).removeAttribute('hidden');
					$(f).dispatchEvent(new Event('show'))
				}
				else {
					$(f).setAttribute('hidden', '');
					$(f).dispatchEvent(new Event('hide'))
				} 
			}, false);
		}
		elems = elem.querySelectorAll('[hide]');
		for (var i=0; i<elems.length; i++) {
			elems[i].addEventListener('click', function(event) {
				var d = event.currentTarget;
				var f = d.getAttribute('hide');
				$(f).setAttribute('hidden', '');
			}, false);
		}
	},

	attachExpanders: function(element) {
		var elem = element || document;
		var elems = elem.querySelectorAll('[expand]');
		for (var i=0; i<elems.length; i++) {
			elems[i].classList.add('expander');
			elems[i].classList.add('collapsed');
			var f = elems[i].getAttribute('expand');
			$(f).classList.add('expandable');
			$(f).classList.add('collapsed');
			var self = this;
			elems[i].addEventListener('click', function(event) {
				var e = event.currentTarget;
				var f = e.getAttribute('expand');
				var t = $(f);
				var b = (t.classList.contains('collapsed'));
				if (b) {
					self.expand(e,t);
				}
				else {
					self.collapse(e,t);
				}
			}, false);
		}
	},

	expand: function(e,t) {
		e.classList.remove('collapsed');
		t.removeAttribute('hidden')
		var el = t;  // closure variable
		setTimeout(function() {
			el.classList.remove('collapsed');
		},1);
		setTimeout(function() {
			el.classList.remove('collapsed');
		},300);
	},

	collapse: function(e,t) {
		e.classList.add('collapsed');
		t.classList.add('collapsed');
		var el = t;  // closure variable
		setTimeout(function() {
			el.setAttribute('hidden','')
		},200);
	},
	
	attachOpenClose: function(element) {
		var elem = element || document;
		var elems = elem.querySelectorAll('[open]');
		var self = this;
		for (var i=0; i<elems.length; i++) {
			elems[i].addEventListener('click', function(event) {
				var n = event.currentTarget.getAttribute('open');
				self.openPopup($(n));
			}, false);
		}
		elems = elem.querySelectorAll('[close]');
		for (var i=0; i<elems.length; i++) {
			elems[i].addEventListener('click', function(event) {
				var n = event.currentTarget.getAttribute('close');
				self.closePopup();
			}, false);
		}
		window.addEventListener('keyup', function(event) {
			if (event.keyCode == 27) {  // escape key
				self.closePopup();
			}
		}, false);
	},

	attachToggleButtons: function(element) {
		var elem = element || document;
		var togglebtns = elem.querySelectorAll('[toggle]');
		for (var d,i=0; i<togglebtns.length; i++) {
			d = togglebtns[i];
			d.addEventListener('click', function(event) {
				var t = event.currentTarget;
				if (t.classList.contains('down')) {
					t.classList.remove('down');
				}
				else {
					// push this one down
					t.classList.add('down');

					// pull all the others up
					var name = t.getAttribute('toggle');
					if (name) {
						var btns = document.querySelectorAll('[toggle='+name+']');
						for (var i=0; i<btns.length; i++) {
							if (btns[i] != t) {
								btns[i].classList.remove('down');
							}
						}
					}
				}
				t.blur();
			}, false);

			// remove whitespace from between a group of toggle buttons
			var name = d.getAttribute('toggle');
			if (name) {
				removeWhiteSpace( d.parentElement);
			}
		}
	},

	attachCssButtons: function(element) {
		var elem = element || document;
		this.path = (window.location.pathname.indexOf('minimal') > -1) ? '' : 'minimal/';
		this.path += 'theme/';
		var cssbtns = elem.querySelectorAll('[css]');
		for (var d,i=0; i<cssbtns.length; i++) {
			d = cssbtns[i];
			var self = this;
			d.addEventListener('click', function(event) {
				var name = event.currentTarget.getAttribute('css');
				var isLoading = !(name == self.theme);
				if (isLoading) {
					if (self.theme) {
						unloadCss(self.path + self.theme + '.css');
					}
					self.theme = name;
					loadCss(self.path + self.theme + '.css');
				}
				else {
					unloadCss(self.path + self.theme + '.css');
					self.theme = '';
				}
			}, false);
		}
	},

	attachSelect: function(element) {
		var elem = element || document;
		// click the header to select all rows
		var a = elem.querySelectorAll('[select] h3');
		for (var i=0; i<a.length; i++) {
			a[i].addEventListener('click', function(e) {
				var a = e.currentTarget.parentElement.querySelectorAll('tr');
				for (var i=0; i<a.length; i++) {
					a[i].classList.toggle('selected');
				}
			}, false);
			a[i].addEventListener('mousedown', function(e) {
				e.preventDefault(); // prevent text selection
			}, false);
		}

		// select each row individually
		a = elem.querySelectorAll('[select] table tbody tr');
		for (var i=0; i<a.length; i++) {
			a[i].addEventListener('click', function(e) {
				e.currentTarget.classList.toggle('selected');
			}, false);
			a[i].addEventListener('mousedown', function(e) {
				e.preventDefault(); // prevent text selection
			}, false);
		}
	},
				
	attachDnd: function(element) {
		var elem = element || document;

		if (!this.dragger) {
			this.dragger = new Dragger();
		}

		var drags = elem.querySelectorAll('[drag]');
		for (var i=0; i<drags.length; i++) {
			this.dragger.enableDrag(drags[i]);
		}

		var drops = elem.querySelectorAll('[drop]');
		for (var i=0; i<drops.length; i++) {
			this.dragger.enableDrop(drops[i]);
		}

		var lists = elem.querySelectorAll('[draglist]');
		for (var i=0; i<lists.length; i++) {
			drags = lists[i].querySelectorAll('li,tr');
			for (var j=0; j<drags.length; j++) {
				this.dragger.enableDrag(drags[j]);
				drags[j].setAttribute('drag', '');
			}
		}

		lists = elem.querySelectorAll('ul[droplist]');
		for (var i=0; i<lists.length; i++) {
			drops = lists[i].querySelectorAll('li');
			for (var lx,j=0; j<=drops.length; j++) {
				lx = document.createElement(drops[0].tagName);
				lx.setAttribute('drop', '');
				lists[i].insertBefore(lx, drops[j]);
				this.dragger.enableDrop(lx);
			}
		}

		lists = elem.querySelectorAll('table[droplist] tbody');
		for (var i=0; i<lists.length; i++) {
			drops = lists[i].querySelectorAll('tr');
			var nCols = drops[0].childNodes.length;
			for (var lx,j=0; j<=drops.length; j++) {
				lx = document.createElement(drops[0].tagName);
				tx = document.createElement('td');
				tx.setAttribute('colspan', nCols);
				lx.appendChild(tx);
				lx.setAttribute('drop', '');
				lists[i].insertBefore(lx, drops[j]);
				this.dragger.enableDrop(lx);
			}
		}

		this.dragger.addListener(null, 'drop', function(e,x,y,t) {
			if (t.tagName.toLowerCase() == 'li' || t.tagName.toLowerCase() == 'tr') {
				t.parentElement.insertBefore(e,t);
			}
			else {
				t.appendChild(e);
			}
		});
	},
	
	closePopup: function() {
		if (this.popup) {
			this.popup.classList.remove('open');
		}
		this.popup = null;
		window.removeEventListener('click', clickAnywhereToClose, false);
	},

	openPopup: function(e) {
		if (this.popup) {
			this.closePopup();
		}
		var b = e.classList.toggle('open');
		this.popup = e;

		// if this is modeless open, add global click handler to close
		setTimeout(function() {
			window.addEventListener('click', clickAnywhereToClose, false);
		}, 25);
	},
}

/* 
	global function
*/
clickAnywhereToClose = function(event) {
	var isInPopup = false;
	var e = event.target;
	while (e) {
		if (e.classList && e.classList.contains('popup') && e.classList.contains('open')) {
			isInPopup = true;
			break;
		}
		e = e.parentElement;
	}

	if (!isInPopup) {
		var m = new Minimal();
		m.closePopup();
	}
}

/* 
	DOM event handler
*/
window.addEventListener('load', function() {
	var minimal = new Minimal();
	minimal.attachAll();
}, false);

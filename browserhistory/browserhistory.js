<!-- Provide global variables: title, keyword, and loadpage() for use with this code.
var title = 'Hist';
var keyword = 'name';
loadpage = function(page) {
	document.title = title + ' ' + page
	document.getElementById('content').innerHTML = 'This is a story about ' + page + '.';
}
-->

nav = function(page) {
	if (!(window.location.protocol.indexOf('file') > -1)) {
		window.history.pushState({page:page}, null, '?' + keyword + '='+page);
	}
	loadpage(page);
}
window.onpopstate = function(event) {
	loadpage(event.state['page']);
}
addEventListener('load', function(event) {
	var qstring = window.location.search;
	var page = '';
	if (qstring.length > 0) {
		var pos = qstring.indexOf(keyword + '=');
		if (pos > -1) {
			pos += keyword.length + 1;
			page = qstring.substring(pos);
		}
	}
	loadpage(page);
}, false)

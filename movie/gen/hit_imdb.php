<?php
/*
Read a list of movies from stdin.  
Write a tabbed list of movie attributes to stdout.
*/

require_once('../phplib/jlog.php');
openjlog(basename(__FILE__));

$title = 'Title';
$ikey = 'IMDB Key';
$status = 'Status';
$year = 'Year';
$ort = 'ORT';
$plot = 'Plot';
$keyword = 'Genre';
$director = 'Director';
$writer = 'Writer';
$actor = 'Cast';
$language = 'Language';

$out = "$title\t$ikey\t$status\t$director\t$writer\t$actor\t$keyword\t$language\t$year\t$ort\t$plot\n";
fwrite(STDOUT,$out);

$line = trim(fgets(STDIN)); // read one line from STDIN
while ($line) {
	$title = $line;

	$ikey = searchImdb($title);
	if (!$ikey) {
		$status = 'not found';
	}
	else {
		$xtitle = readImdb($ikey);
		if ($xtitle == $title) {
			$status = 'match';
		}
		else {
			$status = $xtitle;
		}
	}
	
	$out = "$title\t$ikey\t$status\t$director\t$writer\t$actor\t$keyword\t$language\t$year\t$ort\t$plot\n";
	fwrite(STDOUT,$out);

	$line = trim(fgets(STDIN)); // reads one line from STDIN
}

function searchImdb($title) {
	$ikey = '';
	$url = 'http://www.imdb.com/find?q='.urlencode($title).'&s=tt';
	$content = @file_get_contents($url);	
	if ($content === FALSE) {
		return $ikey;
	}

	$pattern = '/href=\"\/title\/(.*?)\/\?ref\_/';
	preg_match($pattern, $content, $matches);
	if (count($matches) > 0) {
		$ikey = $matches[1];
	}
	return $ikey;
}

function readImdb($ikey) {
	global $year, $ort, $plot, $keyword, $director, $writer, $actor, $language;

	$url = 'http://www.imdb.com/title/'.urlencode($ikey);
	$content = @file_get_contents($url);
	if ($content === FALSE) {
		return;
	}

	$xtitle = '';
	$pattern = '/\<span class\=\"itemprop\" itemprop\=\"name\"\>(.*?)\<\/span\>/';
	preg_match($pattern, $content, $matches);
	if (count($matches) > 0) {
		$xtitle = $matches[1];
	}

	$ort = '';
	$pattern = '/\<time itemprop\=\"duration\" datetime\=\".*?\" \>(.*?)\ min.*?\<\/time\>/s';
	preg_match($pattern, $content, $matches);
	if (count($matches) > 0) {
		$ort = trim($matches[1]);
	}

	$year = '';
	$pattern = '/\<meta itemprop\=\"datePublished\" content=\"(.*?)\-.*?\-.*?\" \/\>/';
	preg_match($pattern, $content, $matches);
	if (count($matches) > 0) {
		$year = $matches[1];
	}

	$plot = '';
	$pattern = '/\<p itemprop\=\"description\"\>(.*?)(\<\/p\>|\<a href)/s';
	preg_match($pattern, $content, $matches);
	if (count($matches) > 0) {
		$plot = trim($matches[1]);
	}

	$language = '';
	$pattern = '/\<a href\=\"\/language\/.*?\?ref\_\=tt\_dt\_dt\" itemprop\=\'url\'\>(.*?)\<\/a\>/';
	preg_match($pattern, $content, $matches);
	if (count($matches) > 0) {
		$language = trim($matches[1]);
	}

	$keyword = '';
	$pattern = '/\<span class\=\"itemprop\" itemprop=\"genre\">(.*?)\<\/span\>/';
	preg_match_all($pattern, $content, $matches);
	if (count($matches) > 0) {
		$arr = $matches[1];
		$count = count($arr);
		for ($i = 0; $i < $count; $i++) {
			if ($keyword) {
				$keyword .= ',';
			}
			$keyword .= strtolower($arr[$i]);
	 	}
	}

	$actor = '';
	//$pattern = '/itemprop=\"actors\".*?(\<span class\=\"itemprop\" itemprop\=\"name\"\>(.*?)\<\/span\>).*?\<\/div\>/sm';
	$pattern = '/itemprop=\"actors\"(.*?)\<\/div\>/sm';
	$subpattern = '/\<span class\=\"itemprop\" itemprop\=\"name\"\>(.*?)\<\/span\>/s';
	preg_match($pattern, $content, $matches);
	if (count($matches) > 0) {
		$subcontent = $matches[1];
		preg_match_all($subpattern, $subcontent, $matches);
		if (count($matches) > 0) {
			$arr = $matches[1];
			$count = count($arr);
			for ($i = 0; $i < $count; $i++) {
				if ($actor) {
					$actor .= ',';
				}
				$actor .= $arr[$i];
		 	}
		}
	}

	$director = '';
	$pattern = '/itemprop=\"director\"(.*?)\<\/div\>/sm';
	$subpattern = '/\<span class\=\"itemprop\" itemprop\=\"name\"\>(.*?)\<\/span\>/s';
	preg_match($pattern, $content, $matches);
	if (count($matches) > 0) {
		$subcontent = $matches[1];
		preg_match_all($subpattern, $subcontent, $matches);
		if (count($matches) > 0) {
			$arr = $matches[1];
			$count = count($arr);
			for ($i = 0; $i < $count; $i++) {
				if ($director) {
					$director .= ',';
				}
				$director .= $arr[$i];
		 	}
		}
	}

	$writer = '';
	$pattern = '/itemprop=\"creator\"(.*?)\<\/div\>/sm';
	$subpattern = '/\<span class\=\"itemprop\" itemprop\=\"name\"\>(.*?)\<\/span\>/s';
	preg_match($pattern, $content, $matches);
	if (count($matches) > 0) {
		$subcontent = $matches[1];
		preg_match_all($subpattern, $subcontent, $matches);
		if (count($matches) > 0) {
			$arr = $matches[1];
			$count = count($arr);
			for ($i = 0; $i < $count; $i++) {
				if ($writer) {
					$writer .= ',';
				}
				$writer .= $arr[$i];
		 	}
		}
	}
	return $xtitle;
}
?>
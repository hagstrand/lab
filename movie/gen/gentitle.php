<?php
/*

*/

require_once('../phplib/config.php');
require_once('../phplib/jlog.php');
require_once('../phplib/dbUtilities.php');

openjlog(basename(__FILE__));

$conn = getConnection();

$sql  = "select t.id, t.name, t.language, t.year, t.ort, t.fmt, t.plot, t.imdbkey, t.filename, t.comment, t.rating ";
$sql .= "from movie.title t ";
$sql .= "order by t.name ";
$result = executeQuery($sql);
$numrows = pg_num_rows($result);
$arr = array();
for ($i=0; $i<$numrows; $i++) {
	$row = pg_fetch_array($result, $i, PGSQL_ASSOC);
	$titleid = (int)$row['id'];
	
	$sql = "select * ";
	$sql .= "from movie.director d ";
	$sql .= "join movie.titledirector td on(d.id = td.directorid) ";
	$sql .= "where td.titleid = $titleid";
	$jresult = executeQuery($sql);
	$jnumrows = pg_num_rows($jresult);
	$director = '';
	for ($j=0; $j<$jnumrows; $j++) {
		$jrow = pg_fetch_array($jresult, $j, PGSQL_ASSOC);
		if ($director) {
			$director .= ', ';
		}
		$director .= $jrow['name'];
	}
	
	$sql = "select * ";
	$sql .= "from movie.writer d ";
	$sql .= "join movie.titlewriter td on(d.id = td.writerid) ";
	$sql .= "where td.titleid = $titleid";
	$jresult = executeQuery($sql);
	$jnumrows = pg_num_rows($jresult);
	$writer = '';
	for ($j=0; $j<$jnumrows; $j++) {
		$jrow = pg_fetch_array($jresult, $j, PGSQL_ASSOC);
		if ($writer) {
			$writer .= ', ';
		}
		$writer .= $jrow['name'];
	}
	
	$sql = "select * ";
	$sql .= "from movie.actor d ";
	$sql .= "join movie.titleactor td on(d.id = td.actorid) ";
	$sql .= "where td.titleid = $titleid";
	$jresult = executeQuery($sql);
	$jnumrows = pg_num_rows($jresult);
	$actor = '';
	for ($j=0; $j<$jnumrows; $j++) {
		$jrow = pg_fetch_array($jresult, $j, PGSQL_ASSOC);
		if ($actor) {
			$actor .= ', ';
		}
		$actor .= $jrow['name'];
	}
	
	$sql = "select * ";
	$sql .= "from movie.keyword d ";
	$sql .= "join movie.titlekeyword td on(d.id = td.keywordid) ";
	$sql .= "where td.titleid = $titleid";
	$jresult = executeQuery($sql);
	$jnumrows = pg_num_rows($jresult);
	$keyword = '';
	for ($j=0; $j<$jnumrows; $j++) {
		$jrow = pg_fetch_array($jresult, $j, PGSQL_ASSOC);
		if ($keyword) {
			$keyword .= ', ';
		}
		$keyword .= $jrow['name'];
	}
	
	$arr[$i] = array('id' => (int)$row['id'], 'name' => $row['name'], 'language' => $row['language'], 'year' => (int)$row['year'], 'ort' => (int)$row['ort'], 'fmt' => $row['fmt'], 'plot' => $row['plot'], 'imdbkey' => $row['imdbkey'], 'filename' => $row['filename'], 'comment' => $row['comment'], 'director' => $director, 'writer' => $writer, 'actor' => $actor, 'keyword' => $keyword, 'rating' => (int)$row['rating']);
}

header('Content-type: text/javascript');
echo "g.title = " . json_encode($arr) . ";\n";
echo "g.movie.onTitleLoaded();";


?>
<?php
/*
Read a match file and generate all the match records.
*/

require_once('../phplib/config.php');
require_once('../phplib/jlog.php');
require_once('../phplib/dbUtilities.php');
require_once('../phplib/excel_reader2.php');

$input_xls = "xls/movies.xls";

openjlog(basename(__FILE__));

$conn = getConnection();

$data = new Spreadsheet_Excel_Reader($input_xls);

//echo $data->dump(true,true);

for ($row=2; $row<=$data->rowcount(); $row++) {
	$title = utf8_encode($data->val($row,1));
	$imdbkey = $data->val($row,2);
	$year = $data->raw($row,3);
	$ort = $data->raw($row,4);
	$language = $data->val($row,5);
	$director = utf8_encode($data->val($row,6));
	$writer = utf8_encode($data->val($row,7));
	$actor = utf8_encode($data->val($row,8));
	$keyword = utf8_encode($data->val($row,9));
	$plot = utf8_encode($data->val($row,10));
	$fmt = $data->val($row,11);
	$filename = $data->val($row,12);
	$comment = utf8_encode($data->val($row,13));
	$rating = $data->raw($row,14);
	
	//echo "title $title\n";
	echo ".";
	
	$director = preg_split("/,\s*/", $director);
	$writer = preg_split("/,\s*/", $writer);
	$actor = preg_split("/,\s*/", $actor);
	$keyword = preg_split("/,\s*/", $keyword);

	$title = pg_escape_string($title);
	$plot = pg_escape_string($plot);
	$comment = pg_escape_string($comment);
	$filename = pg_escape_string($filename);

	// insert title record
	$titleid = getNextSequence("movie.title_id_seq");
	$sql = "insert into movie.title (id, name, language, year, ort, fmt, plot, imdbkey, comment, filename, rating) values ($titleid, '$title', '$language', $year, $ort, '$fmt', '$plot', '$imdbkey', '$comment', '$filename', $rating)";
	$b = executeSql($sql);
	if (!$b) {
		echo "*** insert title failed: $title\n";
	}

	// insert director records
	foreach ($director as $key => $name) {
		if (!$name) {
			jlog(JLOG_DEBUG, "null director row $row");
			continue;
		}
		if ($name == 'x') {
			continue;
		}
		$name = pg_escape_string($name);
		$sql = "select id from movie.director where name = '$name'";
		$directorid = executeQueryOne($sql);
		if (!$directorid) {
			$directorid = getNextSequence("movie.director_id_seq");
			$sql = "insert into movie.director (id, name) values ($directorid, '$name')";
			$b = executeSql($sql);
			if (!$b) {
				echo "*** insert director failed: $title\n";
			}
		}
		$sql = "insert into movie.titledirector (titleid, directorid) values ($titleid, $directorid)";
		$b = executeSql($sql);
		if (!$b) {
			echo "*** insert titledirector failed: $title\n";
		}
	}
	
	// insert writer records
	foreach ($writer as $key => $name) {
		if (!$name) {
			jlog(JLOG_DEBUG, "null writer row $row");
			continue;
		}
		if ($name == 'x') {
			continue;
		}
		$name = pg_escape_string($name);
		$sql = "select id from movie.writer where name = '$name'";
		$writerid = executeQueryOne($sql);
		if (!$writerid) {
			$writerid = getNextSequence("movie.writer_id_seq");
			$sql = "insert into movie.writer (id, name) values ($writerid, '$name')";
			$b = executeSql($sql);
			if (!$b) {
				echo "*** insert writer failed: $title\n";
			}
		}
		$sql = "insert into movie.titlewriter (titleid, writerid) values ($titleid, $writerid)";
		$b = executeSql($sql);
		if (!$b) {
			echo "*** insert titlewriter failed: $title\n";
		}
	}
	
	// insert actor records
	foreach ($actor as $key => $name) {
		if (!$name) {
			jlog(JLOG_DEBUG, "null actor row $row");
			continue;
		}
		if ($name == 'x') {
			continue;
		}
		$name = pg_escape_string($name);
		$sql = "select id from movie.actor where name = '$name'";
		$actorid = executeQueryOne($sql);
		if (!$actorid) {
			$actorid = getNextSequence("movie.actor_id_seq");
			$sql = "insert into movie.actor (id, name) values ($actorid, '$name')";
			$b = executeSql($sql);
			if (!$b) {
				echo "*** insert actor failed: $title\n";
			}
		}
		$sql = "insert into movie.titleactor (titleid, actorid) values ($titleid, $actorid)";
		$b = executeSql($sql);
		if (!$b) {
			echo "*** insert titleactor failed: $title\n";
		}
	}

	// insert keyword records
	foreach ($keyword as $key => $name) {
		if (!$name) {
			jlog(JLOG_DEBUG, "null keyword row $row");
			continue;
		}
		if ($name == 'x') {
			continue;
		}
		$name = pg_escape_string($name);
		$sql = "select id from movie.keyword where name = '$name'";
		$keywordid = executeQueryOne($sql);
		if (!$keywordid) {
			$keywordid = getNextSequence("movie.keyword_id_seq");
			$sql = "insert into movie.keyword (id, name) values ($keywordid, '$name')";
			$b = executeSql($sql);
			if (!$b) {
				echo "*** insert keyword failed: $title\n";
			}
		}
		$sql = "insert into movie.titlekeyword (titleid, keywordid) values ($titleid, $keywordid)";
		executeSql($sql);
		if (!$b) {
			echo "*** insert titlekeyword failed: $title\n";
		}
	}
} 
?>
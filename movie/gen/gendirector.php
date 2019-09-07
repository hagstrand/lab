<?php
/*

*/

require_once('../phplib/config.php');
require_once('../phplib/jlog.php');
require_once('../phplib/dbUtilities.php');

openjlog(basename(__FILE__));

$conn = getConnection();

$sql  = "select id, name ";
$sql .= "from movie.director ";
$sql .= "order by name ";
$result = executeQuery($sql);
$numrows = pg_num_rows($result);
$arr = array();
for ($i=0; $i<$numrows; $i++) {
	$row = pg_fetch_array($result, $i, PGSQL_ASSOC);
	$arr[$i] = array('id' => (int)$row['id'], 'name' => $row['name']);
}

header('Content-type: text/javascript');
echo "g.director = " . json_encode($arr) . ";\n";
echo "g.movie.onDirectorLoaded();";


?>
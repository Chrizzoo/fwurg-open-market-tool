<?php
// array that will contain all the open market values
$values = array();

// load from wiki
$lines = file('http://www.fwurg.net/dokuwiki/rules:open_market&do=export_raw');

// parse lines
foreach($lines as $line) {
	if (preg_match('/^\|.*\|.*\[\[(.*)\]\].*\|.*(\d+\.\d+).*\|.*(\d+\.\d+).*\|$/', $line, $matches)) {
		$values[] = array(
			'name' => trim($matches[1]), // name of item.
			'sell' => trim($matches[2]), // selling price		
			'buy'  => trim($matches[3])  // buying price
		);
	}
}

// output JSON
header('Content-type: application/json');
echo json_encode($values);

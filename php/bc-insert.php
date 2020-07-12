<?php
declare(strict_types = 1);

extension_loaded('openssl') or die('openssl');
require 'lib-r64.php';

if ($argc != 2) {
   echo "bc-insert.php <URL>\n";
   exit(1);
}

$s_url = $argv[1];
$s_info = file_get_contents($s_url);

# track
preg_match('!/track=([^/]*)/!', $s_info, $a_track);
$s_id_2 = $a_track[1];

# img
preg_match('!/img/([^_]*)_!', $s_info, $a_img);
$s_id_3 = $a_img[1];

# year
preg_match("/ (\d{4})\n/", $s_info, $a_year);
$s_year = $a_year[1];
$n_year = (int)($s_year);

# title
preg_match('!<title>(.*) \| (.*)</title>!', $s_info, $a_title);
$s_title = $a_title[2] . ' - ' . $a_title[1];

# time
$n_id_1 = time();
$s_id_1 = r64_encode($n_id_1);

# print
$a_rec = [$s_id_1, $n_year, 'b/' . $s_id_2 . '/' . $s_id_3, $s_title];
$s_json = json_encode($a_rec, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
echo $s_json, ",\n";

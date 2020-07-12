<?php
declare(strict_types = 1);

extension_loaded('openssl') or die('openssl');
require 'lib-r64.php';
require 'lib-yt.php';

if ($argc != 2) {
   echo "yt-insert.php <URL>\n";
   exit(1);
}

# ID
$s_url = $argv[1];
$s_id_2 = yt_video_id($s_url);

# year
$o_play = yt_info_object($s_id_2);
$s_desc = $o_play->desc;

$a_reg = [
   '/ (\d{4})/',
   '/(\d{4,}) /',
   '/Released on: (\d{4})/',
   '/℗ (\d{4})/'
];

$f_reg = function ($s_ca, $s_it) use ($s_desc) {
   $n_mat = preg_match($s_it, $s_desc, $a_mat);
   if ($n_mat === 0) {
      return $s_ca;
   }
   $s_mat = $a_mat[1];
   if ($s_mat >= $s_ca) {
      return $s_ca;
   }
   return $s_mat;
};

$s_init = substr($o_play->date, 0, 4);
$s_year = array_reduce($a_reg, $f_reg, $s_init);
$n_year = (int)($s_year);

# song, artist
$n_mat = preg_match('/.* · .*/', $s_desc, $a_line);

if ($n_mat !== 0) {
   $s_line = $a_line[0];
   $a_title = explode(' · ', $s_line);
   $a_artist = array_slice($a_title, 1);
   $s_title = implode(', ', $a_artist) . ' - ' . $a_title[0];
} else {
   $s_title = $o_play->title;
}

# time
$n_id_1 = time();
$s_id_1 = r64_encode($n_id_1);

# image
if ($o_play->img == 'sddefault') {
   $s_id_3 = '';
} else if ($o_play->img == 'sd1') {
   $s_id_3 = '/sd1';
} else {
   echo $o_play->img, "\n";
   exit(1);
}

# print
$a_rec = [$s_id_1, $n_year, 'y/' . $s_id_2 . $s_id_3, $s_title];
$s_json = json_encode($a_rec, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
echo $s_json, ",\n";

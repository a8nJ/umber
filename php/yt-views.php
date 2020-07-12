<?php
declare(strict_types = 1);

require 'lib-mb.php';
require 'lib-yt.php';

# return artists string from release object
function yt_encode_artists($o_in) {
   foreach ($o_in->{'artist-credit'} as $o_artist) {
      $a_out[] = $o_artist->name;
   }
   return implode(' ', $a_out);
}

# return video_id from search string
function yt_result($s_search) {
   $m_q['search_query'] = $s_search;
   $s_url = 'https://www.youtube.com/results?' . http_build_query($m_q);
   echo $s_url, "\n";
   $s_html = file_get_contents($s_url);
   preg_match('!/vi/([^/]*)/!', $s_html, $a_mat);
   return $a_mat[1];
}

# return views map from video_id string
function yt_views($s_ytid) {
   # part 1
   $o_play = yt_info_object($s_ytid);
   # part 2
   $n_now = time();
   $n_then = strtotime($o_play->date);
   $n_views = (int)($o_play->views);
   # part 3
   $n_diff = ($n_now - $n_then) / 60 / 60 / 24 / 365;
   $n_rate = $n_views / $n_diff;
   # part 4
   $m_v['id'] = $s_ytid;
   $m_v['title'] = $o_play->title;
   $m_v['views per year'] = number_format($n_rate);
   $s_end = "\e[m";
   $s_v = json_encode($m_v, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
   if ($n_rate > 7_000_000) {
      $s_f_red = "\e[1;31m";
      return $s_f_red . $s_v . $s_end;
   }
   $s_f_green = "\e[1;32m";
   return $s_f_green . $s_v . $s_end;
}

if ($argc != 2) {
   echo <<<eof
usage:
yt-views.php <URL>

examples:
https://musicbrainz.org/release-group/d03bb6b1-d7b4-38ea-974e-847cbb31dca4
https://musicbrainz.org/release/7a629d52-6a61-3ea1-a0a0-dd50bdef63b4
https://www.youtube.com/watch?v=Gl9GtO_vQxw
eof;
   exit(1);
}

$s_url = $argv[1];

if (strpos($s_url, 'youtube') !== false) {
   # YOUTUBE
   $s_ytid = yt_video_id($s_url);
   echo yt_views($s_ytid);
} else {
   # MUSICBRAINZ
   $s_mbid = basename($s_url);
   if (strpos($s_url, 'release-group') !== false) {
      # RELEASE GROUP
      $a_releases = mb_decode_group($s_mbid);
      $o_init = new stdClass;
      $o_init->year = '9999';
      $o_re = array_reduce($a_releases, 'mb_reduce_group', $o_init);
   } else {
      # RELEASE
      $o_re = mb_decode_release($s_mbid);
   }
   $s_artists = yt_encode_artists($o_re);
   foreach ($o_re->media as $o_media) {
      foreach ($o_media->tracks as $o_track) {
         $s_ytid = yt_result($s_artists . ' ' . $o_track->title);
         echo yt_views($s_ytid), "\n";
         usleep(500_000);
      }
   }
}

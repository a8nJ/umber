<?php
declare(strict_types = 1);

# return video_id from URL
function yt_video_id($s_url) {
   $s_q = parse_url($s_url, PHP_URL_QUERY);
   parse_str($s_q, $m_q);
   return $m_q['v'];
}

function f_head($s_url) {
   $a_head = get_headers($s_url);
   $s_code = $a_head[0];
   if (strpos($s_code, '200 OK') !== false) {
      return true;
   }
   return false;
}

# return info object from video id
function yt_info_object($s_id) {
   # part 1
   $s_url = 'https://www.youtube.com/get_video_info?video_id=' . $s_id;
   # part 2
   echo $s_url, "\n";
   $s_info = file_get_contents($s_url);
   parse_str($s_info, $m_info);
   # part 3
   $s_resp = $m_info['player_response'];
   # part 4
   $o_r = json_decode($s_resp);
   # part 5
   $o_p = new stdClass;
   $o_p->date = $o_r->microformat->playerMicroformatRenderer->publishDate;
   $o_p->desc = $o_r->videoDetails->shortDescription;
   $o_p->title = $o_r->videoDetails->title;
   $o_p->views = $o_r->videoDetails->viewCount;
   if (f_head('https://i.ytimg.com/vi/' . $s_id . '/sddefault.jpg')) {
      $o_p->img = 'sddefault';
   } else if (f_head('https://i.ytimg.com/vi/' . $s_id . '/sd1.jpg')) {
      $o_p->img = 'sd1';
   } else {
      $o_p->img = 'hqdefault';
   }
   return $o_p;
}

'use strict';
import {f_date} from '/umber/js/date.js';

function f1_json(o_resp) {
   return o_resp.json();
}

function f2_listen(a_table) {
   // part 1
   const a_row = a_table.find(f3_track);
   // part 2
   const a_id = a_row[2].split('/');
   const o_date = document.getElementById('date');
   const o_vid = document.getElementById('vid');
   const s_date = a_row[0];
   const s_ext = a_id[0];
   const s_pos = a_id[1];
   const s_title = a_row[3];
   const s_year = a_row[1].toString();
   document.getElementById('track').textContent = s_title;
   document.title = s_title + ' / Backblaze player';
   o_date.textContent = 'released ' + s_year + ' - posted ' + f_date(s_date);
   o_vid.src = 'https://f002.backblazeb2.com/file/0Tl4aD/' +
   s_date + '.' + s_ext;
   // need this for audio files
   o_vid.poster = 'https://f002.backblazeb2.com/file/0Tl4aD/' + s_pos + '.jpg';
}

function f3_track(a_row) {
   const s_v = new URLSearchParams(location.search);
   return a_row[0] == s_v.get('v');
}

fetch('/umber/umber.json').then(f1_json).then(f2_listen);

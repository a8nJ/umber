'use strict';
import {f_date} from '/umber/js/date.js';

function f1_json(o_resp) {
   return o_resp.json();
}

function f2_listen(a_table) {
   const a_row = a_table.find(f3_track);
   const s_date = a_row[0];
   const s_year = a_row[1].toString();
   const a_id = a_row[2].split('/');
   const s_ext = a_id[0];
   const s_src = a_id[1];
   const s_pos = a_id[2];
   const s_title = a_row[3];
   document.title = s_title + ' / Catbox player';
   document.getElementById('track').textContent = s_title;
   const o_date = document.getElementById('date');
   o_date.textContent = 'released ' + s_year + ' - posted ' + f_date(s_date);
   const o_vid = document.getElementById('vid');
   o_vid.src = 'https://files.catbox.moe/' + s_src + '.' + s_ext;
   // FIXME remove this?
   o_vid.poster = 'https://files.catbox.moe/' + s_pos + '.jpg';
}

function f3_track(a_row) {
   const s_v = new URLSearchParams(location.search).get('v');
   return a_row[0] == s_v;
}

fetch('/umber/umber.json').then(f1_json).then(f2_listen);

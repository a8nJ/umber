'use strict';
import {f_date} from '/umber/js/date.js';

function f1_json(o_resp) {
   return o_resp.json();
}

function f2_listen(a_table) {
   const a_row = a_table.find(f3_track);
   const s_song = a_row[0];
   const s_year = a_row[1].toString();
   const a_album = a_row[2].split('/');
   const s_album = a_album[1];
   const s_ext = a_album[2];
   const s_title = a_row[3];
   document.title = s_title + ' - Umber Listen';
   document.getElementById('artist').textContent = s_title;
   const o_date = document.getElementById('date');
   o_date.textContent = 'released ' + s_year + ' - posted ' + f_date(s_song);
   const o_listen = document.getElementById('listen');
   const s_path = 'https://github.com/muv1/umber/releases/download';
   o_listen.src = s_path + '/' + s_album + '/' + s_song + '.' + s_ext;
   o_listen.poster = s_path + '/' + s_album + '/' + s_album + '.jpg';
}

function f3_track(a_row) {
   const s_v = new URLSearchParams(location.search).get('v');
   return a_row[0] == s_v;
}

fetch('/umber/umber.json').then(f1_json).then(f2_listen);

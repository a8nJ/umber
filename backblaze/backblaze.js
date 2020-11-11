'use strict';
import {date_f} from '/umber/js/date.js';

function json_f(resp_o) {
   return resp_o.json();
}

function listen_f(table_a) {
   // part 1
   const row_a = table_a.find(track_f);
   // part 2
   const id_a = row_a[2].split('/');
   const date_o = document.getElementById('date');
   const vid_o = document.getElementById('vid');
   const date_s = row_a[0];
   const path_s = 'https://f002.backblazeb2.com/file/0Tl4aD';
   const title_s = row_a[3];
   const year_s = row_a[1].toString();
   document.getElementById('track').textContent = title_s;
   document.title = title_s + ' / Backblaze player';
   date_o.textContent = 'released ' + year_s + ' - posted ' + date_f(date_s);
   // need this for audio files
   vid_o.poster = path_s + '/' + id_a[1] + '.jpg';
   vid_o.src = path_s + '/' + date_s + '.' + id_a[0];
}

function track_f(row_a) {
   const o = new URLSearchParams(location.search);
   return row_a[0] == o.get('v');
}

fetch('/umber/umber.json').then(json_f).then(listen_f);

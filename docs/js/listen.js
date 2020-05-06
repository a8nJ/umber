'use strict';

function f1_json(o_resp) {
   return o_resp.json();
}

function f2_listen(a_table) {
   const a_row = a_table.find(f3_track);
   const s_songid = a_row[0];
   const s_year = a_row[1].toString();
   const s_albumid = a_row[2].slice(2);
   const s_title = a_row[3];
   const s_date = new Date(s_songid * 1000).toDateString();
   document.title = s_title + ' - Umber Listen';
   document.getElementById('artist').textContent = s_title;
   const o_date = document.getElementById('date');
   o_date.textContent = 'released ' + s_year + ' - posted ' + s_date;
   const o_listen = document.getElementById('listen');
   const s_path = 'https://github.com/muv1/umber/releases/download';
   o_listen.src = s_path + '/' + s_albumid + '/' + s_songid;
   o_listen.poster = s_path + '/' + s_albumid + '/image.jpg';
}

function f3_track(a_row) {
   const s_v = new URLSearchParams(location.search).get('v');
   const n_v = Number(s_v);
   return a_row[0] == n_v;
}

fetch('/umber/umber.json').then(f1_json).then(f2_listen);

'use strict';

function f_json(o_resp) {
   return o_resp.json();
}

function f_listen(a_juke) {
   const a_track = a_juke.find(f_track);
   const n_song = a_track[0];
   const n_year = a_track[1];
   const s_album = a_track[2].slice(2);
   const s_title = a_track[3];
   const s_date = new Date(n_song * 1000).toDateString();
   document.title = s_title + ' - Umber Listen';
   document.getElementById('artist').textContent = s_title;

   const o_date = document.getElementById('date');
   o_date.textContent = 'released ' + n_year + ' - posted ' + s_date;

   const o_listen = document.getElementById('listen');
   o_listen.src = s_path + '/' + s_album + '/' + n_song;
   o_listen.poster = s_path + '/' + s_album + '/image.jpg';
}

function f_track(a_track) {
   return a_track[0] == n_v;
}

const s_v = new URLSearchParams(location.search).get('v');
const n_v = +(s_v);
const s_path = 'https://github.com/muv1/umber/releases/download';
const s_json = '/umber/umber.json';
const o_fetch = fetch(s_json);
const o_json = o_fetch.then(f_json);
o_json.then(f_listen);

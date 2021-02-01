'use strict';
import {date} from '/umber/js/date.js';

function json(resp_o) {
   return resp_o.json();
}

function listen(table) {
   const row = table.find(track);
   const id = row[2].split('/');
   const date_o = document.getElementById('date');
   const vid = document.getElementById('vid');
   const date_s = row[0];
   const path = 'https://f002.backblazeb2.com/file/ql8mlh';
   const title = row[3];
   const year = row[1].toString();
   document.getElementById('track').textContent = title;
   document.title = title + ' / Backblaze player';
   date_o.textContent = 'released ' + year + ' - posted ' + date(date_s);
   // need this for audio files
   vid.poster = path + '/' + id[1] + '.jpg';
   vid.src = path + '/' + date_s + '.' + id[0];
}

function track(row) {
   const par = new URLSearchParams(location.search);
   return row[0] == par.get('v');
}

fetch('/umber/umber.json').then(json).then(listen);

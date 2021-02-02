'use strict';
import {getDate} from '/umber/js/date.js';

function json(resp) {
   return resp.json();
}

function getRow(table) {
   const search = new URLSearchParams(location.search);
   for (const row of table) {
      const par = new URLSearchParams(row.q);
      if (par.get('a') == search.get('a')) {
         return {q: par, s: row.s};
      }
   }
}

function listen(table) {
   const row = getRow(table);
   const src = row.q.get('a');
   const vid = document.getElementById('vid');
   const date = document.getElementById('date');
   const path = 'https://f002.backblazeb2.com/file/ql8mlh';
   document.getElementById('track').textContent = row.s;
   document.title = row.s + ' / Backblaze player';
   date.textContent = 'released ' + row.q.get('y') + ' - posted ' + getDate(src);
   // need this for audio files
   vid.src = path + '/' + src + '.' + row.q.get('p');
   vid.poster = path + '/' + row.q.get('b') + '.jpg';
}

fetch('/umber/umber.json').then(json).then(listen);

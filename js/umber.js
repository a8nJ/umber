'use strict';
import {backblaze} from '/umber/js/backblaze.js';
import {getDate} from '/umber/js/date.js';
import {soundcloud} from '/umber/js/soundcloud.js';
import {youtube} from '/umber/js/youtube.js';

const page = 30;

function data(table) {
   const search = new URLSearchParams(location.search);
   // 1. filter
   if (search.has('s')) {
      table = table.filter(
         // for now, just match one the artist, album and song.
         row => RegExp(search.get('s'), 'i').test(row.s)
      );
   }
   // 2. slice
   const begin = getBegin(search, table);
   const slice = table.slice(begin, begin + page);
   const figures = document.getElementById('figures');
   for (const row of slice) {
      figures.append(figure(row));
   }
   const older = document.getElementById('older');
   const oldIndex = begin + page;
   if (oldIndex < table.length) {
      const par = new URLSearchParams(table[oldIndex].q);
      search.set('a', par.get('a'));
      older.href = '?' + search.toString();
   } else {
      older.remove();
   }
   const newer = document.getElementById('newer');
   const newIndex = begin - page;
   if (newIndex >= 0) {
      const par = new URLSearchParams(table[newIndex].q);
      search.set('a', par.get('q'));
      newer.href = '?' + search.toString();
   } else {
      newer.remove();
   }
}

function figure(row) {
   // part 1
   const par = new URLSearchParams(row.q);
   const temp = document.querySelector('#temp');
   // part 2
   const alfa = par.get('a');
   const figure = temp.content.cloneNode(true);
   const time = figure.querySelector('time');
   time.textContent = 'released ' + par.get('y') + ' - posted ' + getDate(alfa);
   // part 3
   const attr = hrefSrc(par);
   const figA = figure.querySelector('a');
   const figcapA = figure.querySelector('figcaption a');
   const img = figure.querySelector('img');
   figA.href = attr.href;
   figA.target = '_blank';
   figcapA.href = attr.href;
   figcapA.target = '_blank';
   figcapA.textContent = row.s;
   img.src = attr.src;
   return figure;
}

function getBegin(search, table) {
   if (! search.has('a')) {
      return 0;
   }
   for (const [n, row] of table.entries()) {
      const par = new URLSearchParams(row.q);
      const alfa = par.get('a');
      // account for deleted entries
      if (alfa <= search.get('a')) {
         document.title = 'Umber - ' + getDate(alfa);
         return n;
      }
   }
   return 0;
}

function hrefSrc(par) {
   switch (par.get('p')) {
   case 'm4a':
   case 'mp3':
   case 'mp4':
      return backblaze(par);
   case 's':
      return soundcloud(par);
   default:
      return youtube(par);
   }
}

function json(resp) {
   return resp.json();
}

fetch('/umber/umber.json').then(json).then(data);

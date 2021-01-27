'use strict';
import {backblaze} from '/umber/js/backblaze.js';
import {date} from '/umber/js/date.js';
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
      const param = new URLSearchParams(table[oldIndex].q);
      search.set('a', param.get('a'));
      older.href = '?' + search.toString();
   } else {
      older.remove();
   }
   const newer = document.getElementById('newer');
   const newIndex = begin - page;
   if (newIndex >= 0) {
      const param = new URLSearchParams(table[newIndex].q);
      search.set('a', param.get('q'));
      newer.href = '?' + search.toString();
   } else {
      newer.remove();
   }
}

function figure(row) {
   // part 1
   const param = new URLSearchParams(row.q);
   const temp = document.querySelector('#temp');
   // part 2
   const alfa = param.get('a');
   const figure = temp.content.cloneNode(true);
   const time = figure.querySelector('time');
   time.textContent = 'released ' + param.get('y') + ' - posted ' + date(alfa);
   // part 3
   const attr = hrefSrc(param);
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
      const param = new URLSearchParams(row.q);
      const alfa = param.get('a');
      // account for deleted entries
      if (alfa <= search.get('a')) {
         document.title = 'Umber - ' + date(alfa);
         return n;
      }
   }
   return 0;
}

function hrefSrc(param) {
   switch (param.get('p')) {
   case 'm4a':
   case 'mp3':
   case 'mp4':
      return backblaze(param);
   case 's':
      return soundcloud(param);
   default:
      return youtube(param);
   }
}

function json(resp) {
   return resp.json();
}

fetch('/umber/umber.json').then(json).then(data);

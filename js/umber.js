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
      function filter(row) {
         // for now, just match one the artist, album and song.
         return RegExp(search.get('s'), 'i').test(row.S);
      }
      table = table.filter(filter);
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
      const par = new URLSearchParams(table[oldIndex].Q);
      search.set('a', par.get('a'));
      older.href = '?' + search.toString();
   } else {
      older.remove();
   }
   const newer = document.getElementById('newer');
   const newIndex = begin - page;
   if (newIndex >= 0) {
      const par = new URLSearchParams(table[newIndex].Q);
      search.set('a', par.get('a'));
      newer.href = '?' + search.toString();
   } else {
      newer.remove();
   }
}

function figure(row) {
   // part 1
   const par = new URLSearchParams(row.Q);
   const temp = document.querySelector('#temp');
   // part 2
   const alfa = par.get('a');
   const clone = temp.content.cloneNode(true);
   const time = clone.querySelector('time');
   time.textContent = 'released ' + par.get('y') + ' - posted ' + getDate(alfa);
   // part 3
   const attr = hrefSrc(par, row.S);
   const img = clone.querySelector('img');
   img.src = attr.src;
   const figcap = clone.querySelector('figcaption');
   figcap.textContent = row.S;
   const figA = clone.querySelector('a');
   figA.href = attr.href;
   figA.target = '_blank';
   if (localStorage.getItem(attr.href) === null) {
      // cover click on desktop and long press on mobile
      figA.onclick = figA.oncontextmenu = function () {
         localStorage.setItem(this.href, '');
         this.parentNode.style.color = 'hsl(270, 100%, 50%)';
      };
   } else {
      figA.parentNode.style.color = 'hsl(270, 100%, 50%)';
   }
   return clone;
}

function getBegin(search, table) {
   if (! search.has('a')) {
      return 0;
   }
   for (const [n, row] of table.entries()) {
      const par = new URLSearchParams(row.Q);
      const alfa = par.get('a');
      // account for deleted entries
      if (alfa <= search.get('a')) {
         document.title = 'Umber - ' + getDate(alfa);
         return n;
      }
   }
   return 0;
}

function hrefSrc(q, s) {
   switch (q.get('p')) {
   case 'y':
      return youtube(q);
   case 's':
      return soundcloud(q);
   default:
      return backblaze(q, s);
   }
}

function json(resp) {
   return resp.json();
}

fetch('/umber/umber.json').then(json).then(data);

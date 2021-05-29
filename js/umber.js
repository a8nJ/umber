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
      const sp = new URLSearchParams(table[oldIndex].Q);
      search.set('a', sp.get('a'));
      older.href = '?' + search.toString();
   } else {
      older.remove();
   }
   const newer = document.getElementById('newer');
   const newIndex = begin - page;
   if (newIndex >= 0) {
      const sp = new URLSearchParams(table[newIndex].Q);
      search.set('a', sp.get('a'));
      newer.href = '?' + search.toString();
   } else {
      newer.remove();
   }
}

function figure(row) {
   // search params
   const sp = new URLSearchParams(row.Q);
   const temp = document.querySelector('template');
   // a ID
   const aID = sp.get('a');
   const clone = temp.content.cloneNode(true);
   const attr = hrefSrc(sp, row.S);
   // a
   const anc = clone.querySelector('a');
   anc.target = '_blank';
   anc.href = attr.href;
   // img
   const img = clone.querySelector('img');
   img.src = attr.src;
   // thead
   const thead = clone.querySelector('thead td');
   thead.textContent = row.S;
   // tbody .release
   const rel = clone.querySelector('.release');
   rel.textContent = sp.get('y');
   // tbody .post
   const post = clone.querySelector('.post');
   post.textContent = getDate(aID);
   // views
   const tdView = clone.querySelector('td.view');
   const thView = clone.querySelector('th.view');
   const view = localStorage.getItem(anc.href);
   if (view !== null) {
      tdView.textContent = view;
   } else {
      thView.style.display = tdView.style.display = 'none';
   }
   // desktop and mobile
   anc.onclick = anc.oncontextmenu = function() {
      let val = localStorage.getItem(this.href);
      localStorage.setItem(this.href, Number(val) + 1);
      thView.style.display = tdView.style.display = '';
      tdView.textContent = Number(val) + 1;
   };
   return clone;
}

function getBegin(search, table) {
   if (! search.has('a')) {
      return 0;
   }
   for (const [n, row] of table.entries()) {
      const sp = new URLSearchParams(row.Q);
      const aID = sp.get('a');
      // account for deleted entries
      if (aID <= search.get('a')) {
         document.title = 'Umber - ' + getDate(aID);
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

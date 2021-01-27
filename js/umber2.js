'use strict';
import {backblaze} from '/umber/js/backblaze.js';
import {date} from '/umber/js/date.js';
import {soundcloud_f} from '/umber/js/soundcloud.js';
import {youtube_f} from '/umber/js/youtube.js';

const page = 30;

function data(table) {
   const search = new URLSearchParams(location.search);
   // 1. filter
   if (search.has('s')) {
      // for now, just match one the artist, album and song.
      table = table.filter(
         row => RegExp(search.get('q'), 'i').test(row.s)
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
   const param = new URLSearchParams(row.q);
   // column 0
   const alfa = param.get('a');
   // column 1
   const year = param.get('y');
   // column 2
   const site = param.get('p');
   const audio = param.get('b');
   let video = '';
   if (host.length == 3) {
      video = host[2];
   }
   // column 3
   const title_s = row[3];
   const attr_m = href_src(site, alfa, audio, video);
   const temp_o = document.querySelector('#temp');
   const fig_o = temp_o.content.cloneNode(true);
   const cap_a_o = fig_o.querySelector('figcaption a');
   const img_o = fig_o.querySelector('img');
   const img_a_o = fig_o.querySelector('a');
   const time_o = fig_o.querySelector('time');
   cap_a_o.href = attr_m.href;
   cap_a_o.target = '_blank';
   cap_a_o.textContent = title_s;
   img_o.src = attr_m.src;
   img_a_o.href = attr_m.href;
   img_a_o.target = '_blank';
   time_o.textContent = 'released ' + year + ' - posted ' + date(alfa);
   return fig_o;
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

function href_src(site_s, date_s, audio_s, video_s) {
   switch (site_s) {
   case 'm4a':
   case 'mp3':
   case 'mp4':
      return backblaze(date_s, audio_s);
   case 's':
      return soundcloud_f(audio_s, video_s);
   default:
      return youtube_f(audio_s, video_s);
   }
}

function json(resp) {
   return resp.json();
}

fetch('/umber/umber.json').then(json).then(data);

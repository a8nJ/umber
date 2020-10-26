'use strict';
import {f_backblaze} from '/umber/js/backblaze.js';
import {f_bandcamp} from '/umber/js/bandcamp.js';
import {f_date} from '/umber/js/date.js';
import {f_soundcloud} from '/umber/js/soundcloud.js';
import {f_youtube} from '/umber/js/youtube.js';

function f1_json(o_resp) {
   return o_resp.json();
}

function f2_data(a_table) {
   const o_par = new URLSearchParams(location.search);
   // 1. filter
   if (o_par.has('q')) {
      const s_query = o_par.get('q');
      function f_filter(a_row) {
         /* for now, we are going to match on just the artist and recording. if
         we later decide to match other items, its tempting to just join the
         array and match on that. however the year is a number, and some
         languages dont allow arrays of different types. so if the time comes,
         handle each element individually rather than trying to join the
         array. */
         const s_song = a_row[3];
         return RegExp(s_query, 'i').test(s_song);
      }
      a_table = a_table.filter(f_filter);
   }
   // 2. slice
   let n_begin = 0;
   if (o_par.has('v')) {
      const s_v = o_par.get('v');
      function f_index(a_row) {
         // account for deleted entries
         return a_row[0] <= s_v;
      }
      n_begin = a_table.findIndex(f_index);
      if (n_begin == -1) {
         n_begin = 0;
      }
      document.title = 'Umber - ' + f_date(s_v);
   }
   const n_page = 30;
   const a_slice = a_table.slice(n_begin, n_begin + n_page);
   const o_figs = document.getElementById('figures');
   for (const a_row of a_slice) {
      const o_fig = f3_figure(a_row);
      o_figs.append(o_fig);
   }
   const o_old = document.getElementById('older');
   const n_old = n_begin + n_page;
   if (n_old < a_table.length) {
      const s_v = a_table[n_old][0];
      o_par.set('v', s_v);
      o_old.href = '?' + o_par.toString();
   } else {
      o_old.remove();
   }
   const o_new = document.getElementById('newer');
   const n_new = n_begin - n_page;
   if (n_new >= 0) {
      const s_v = a_table[n_new][0];
      o_par.set('v', s_v);
      o_new.href = '?' + o_par.toString();
   } else {
      o_new.remove();
   }
}

function f3_figure(a_row) {
   // column 0
   const s_id_1 = a_row[0];
   // column 1
   const s_year = a_row[1].toString();
   // column 2
   const a_host = a_row[2].split('/');
   const s_site = a_host[0];
   const s_id_2 = a_host[1];
   let s_id_3 = '';
   if (a_host.length == 3) {
      s_id_3 = a_host[2];
   }
   // column 3
   const s_title = a_row[3];
   let m;
   switch (s_site) {
   case 'b':
      m = f_bandcamp(s_id_2, s_id_3);
      break;
   case 'm4a':
   case 'mp3':
   case 'mp4':
      m = f_backblaze(s_id_1, s_id_2);
      break;
   case 's':
      m = f_soundcloud(s_id_2, s_id_3);
      break;
   case 'y':
      m = f_youtube(s_id_2, s_id_3);
   }
   // part 1
   const o_temp = document.querySelector('#temp');
   // part 2
   const o_fig = o_temp.content.cloneNode(true);
   // part 3
   const o_cap_a = o_fig.querySelector('figcaption a');
   const o_img = o_fig.querySelector('img');
   const o_img_a = o_fig.querySelector('a');
   const o_time = o_fig.querySelector('time');
   o_cap_a.href = m.href;
   o_cap_a.target = '_blank';
   o_cap_a.textContent = s_title;
   o_img.src = m.src;
   o_img_a.href = m.href;
   o_img_a.target = '_blank';
   o_time.textContent = 'released ' + s_year + ' - posted ' + f_date(s_id_1);
   return o_fig;
}

fetch('/umber/umber.json').then(f1_json).then(f2_data);

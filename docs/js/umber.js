'use strict';
import {f_backblaze} from '/umber/js/b2.js';
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
      const o_reg = RegExp(s_query, 'i');
      function f_filter(a_row) {
         const s_row = a_row.join();
         return o_reg.test(s_row);
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
   }
   const n_page = 12;
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
   // elements
   const o_figcap = document.createElement('figcaption');
   const o_figure = document.createElement('figure');
   const o_time = document.createElement('time');
   // column 0
   const s_id_1 = a_row[0];
   // column 1
   const s_year = a_row[1].toString();
   // column 2
   const a_host = a_row[2].split('/');
   const s_site = a_host[0];
   const s_id_2 = a_host[1];
   let s_id_3;
   if (a_host.length == 3) {
      s_id_3 = a_host[2];
   }
   // column 3
   const s_title = a_row[3];
   // begin
   let o_a;
   switch (s_site) {
   case 'b':
      o_a = f_bandcamp(s_id_2, s_id_3, s_title);
      break;
   case 'm4a':
   case 'mp3':
   case 'mp4':
      o_a = f_backblaze(s_id_1, s_id_2);
      break;
   case 's':
      o_a = f_soundcloud(s_id_2, s_id_3, s_title);
      break;
   case 'y':
      o_a = f_youtube(s_id_2, s_title);
   }
   // end
   o_figcap.textContent = s_title;
   o_time.textContent = 'released ' + s_year + ' - posted ' + f_date(s_id_1);
   o_a.append(o_figcap);
   o_figure.append(o_a, o_time);
   return o_figure;
}

fetch('/umber/umber.json').then(f1_json).then(f2_data);

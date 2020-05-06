'use strict';
import {f_bandcamp} from '/umber/js/bandcamp.js';
import {f_github} from '/umber/js/github.js';
import {f_soundcloud} from '/umber/js/soundcloud.js';
import {f_youtube} from '/umber/js/youtube.js';

function f1_json(o_resp) {
   return o_resp.json();
}

function f2_data(a_data) {
   let n_cur = 0;
   for (const a_row of a_data) {
      const s_sub = a_row.join();
      const o_reg = RegExp(s_query);;
      // value match - move the cursor
      if (o_reg.test(s_sub)) {
         // index match - add to DOM
         if (n_cur >= n_begin && n_cur <= n_end) {
            const o_fig = f3_figure(a_row);
            document.getElementById('figures').append(o_fig);
         }
         n_cur++;
      }
      if (n_cur > n_end) {
         break;
      }
   }
   const o_old = document.getElementById('older');
   if (n_cur > n_end) {
      o_par.set('p', n_page + 1);
      o_old.href = '?' + o_par.toString();
   } else {
      o_old.remove();
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
   // column 3
   const s_title = a_row[3];
   // begin
   let o_a;
   if (s_site == 'b') {
      const s_id_3 = a_host[2];
      o_a = f_bandcamp(s_id_2, s_id_3, s_title);
   }
   if (s_site == 's') {
      const s_id_3 = a_host[2];
      o_a = f_soundcloud(s_id_2, s_id_3, s_title);
   }
   if (s_site == 'g') {
      o_a = f_github(s_id_1, s_id_2);
   }
   if (s_site == 'y') {
      o_a = f_youtube(s_id_2, s_title);
   }
   // end
   o_figcap.textContent = s_title;
   o_time.textContent = 'released ' + s_year + ' - posted ' + f4_date(s_id_1);
   o_a.append(o_figcap);
   o_figure.append(o_a, o_time);
   return o_figure;
}

function f4_date(s_id) {
   return new Date(s_id * 1000).toDateString();
}

const o_par = new URLSearchParams(location.search);
let n_page;

if (o_par.has('p')) {
   const s_page = o_par.get('p');
   n_page = Number(s_page);
} else {
   n_page = 1;
}

const n_step = 12;
const n_begin = (n_page - 1) * n_step;
const n_end = n_begin + n_step - 1;
let s_query = '';

if (o_par.has('q')) {
   s_query = o_par.get('q');
}

const o_new = document.getElementById('newer');

// "p" could be "1" implicitly or explicitly
if (n_page == 1) {
   o_new.remove();
} else {
   o_par.set('p', n_page - 1);
   o_new.href = '?' + o_par.toString();
}

fetch('/umber/umber.json').then(f1_json).then(f2_data);

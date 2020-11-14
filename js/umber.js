'use strict';
import {backblaze_f} from '/umber/js/backblaze.js';
import {bandcamp_f} from '/umber/js/bandcamp.js';
import {date_f} from '/umber/js/date.js';
import {soundcloud_f} from '/umber/js/soundcloud.js';
import {youtube_f} from '/umber/js/youtube.js';

function json_f(resp_o) {
   return resp_o.json();
}

function data_f(table_a) {
   const par_o = new URLSearchParams(location.search);
   // 1. filter
   if (par_o.has('q')) {
      const query_s = par_o.get('q');
      function filter_f(row_a) {
         /* for now, we are going to match on just the artist and recording. if
         we later decide to match other items, its tempting to just join the
         array and match on that. however the year is a number, and some
         languages dont allow arrays of different types. so if the time comes,
         handle each element individually rather than trying to join the
         array. */
         const song_s = row_a[3];
         return RegExp(query_s, 'i').test(song_s);
      }
      table_a = table_a.filter(filter_f);
   }
   // 2. slice
   let begin_n = 0;
   if (par_o.has('v')) {
      let id_s = par_o.get('v');
      function index_f(row_a) {
         // account for deleted entries
         return row_a[0] <= id_s;
      }
      begin_n = table_a.findIndex(index_f);
      if (begin_n == -1) {
         begin_n = 0;
      }
      id_s = table_a[begin_n][0];
      document.title = 'Umber - ' + date_f(id_s);
   }
   const page_n = 30;
   const slice_a = table_a.slice(begin_n, begin_n + page_n);
   const figs_o = document.getElementById('figures');
   for (const row_a of slice_a) {
      const fig_o = figure_f(row_a);
      figs_o.append(fig_o);
   }
   const old_o = document.getElementById('older');
   const old_n = begin_n + page_n;
   if (old_n < table_a.length) {
      const id_s = table_a[old_n][0];
      par_o.set('v', id_s);
      old_o.href = '?' + par_o.toString();
   } else {
      old_o.remove();
   }
   const new_o = document.getElementById('newer');
   const new_n = begin_n - page_n;
   if (new_n >= 0) {
      const id_s = table_a[new_n][0];
      par_o.set('v', id_s);
      new_o.href = '?' + par_o.toString();
   } else {
      new_o.remove();
   }
}

function figure_f(row_a) {
   // column 0
   const date_s = row_a[0];
   // column 1
   const year_s = row_a[1].toString();
   // column 2
   const host_a = row_a[2].split('/');
   const site_s = host_a[0];
   const audio_s = host_a[1];
   let video_s = '';
   if (host_a.length == 3) {
      video_s = host_a[2];
   }
   // column 3
   const title_s = row_a[3];
   let m;
   switch (site_s) {
   case 'b':
      m = bandcamp_f(audio_s, video_s);
      break;
   case 'm4a':
   case 'mp3':
   case 'mp4':
      m = backblaze_f(date_s, audio_s);
      break;
   case 's':
      m = soundcloud_f(audio_s, video_s);
      break;
   case 'y':
      m = youtube_f(audio_s, video_s);
   }
   // part 1
   const temp_o = document.querySelector('#temp');
   // part 2
   const fig_o = temp_o.content.cloneNode(true);
   // part 3
   const cap_a_o = fig_o.querySelector('figcaption a');
   const img_o = fig_o.querySelector('img');
   const img_a_o = fig_o.querySelector('a');
   const time_o = fig_o.querySelector('time');
   cap_a_o.href = m.href;
   cap_a_o.target = '_blank';
   cap_a_o.textContent = title_s;
   img_o.src = m.src;
   img_a_o.href = m.href;
   img_a_o.target = '_blank';
   time_o.textContent = 'released ' + year_s + ' - posted ' + date_f(date_s);
   return fig_o;
}

fetch('/umber/umber.json').then(json_f).then(data_f);

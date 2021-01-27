'use strict';
import {backblaze} from '/umber/js/backblaze.js';
import {date} from '/umber/js/date.js';
import {soundcloud_f} from '/umber/js/soundcloud.js';
import {youtube_f} from '/umber/js/youtube.js';

function json(resp) {
   return resp.json();
}

function data(table) {
   const param = new URLSearchParams(location.search);
   // 1. filter
   if (param.has('q')) {
      // for now, just match one the artist, album and song.
      table = table.filter(
         row => RegExp(param.get('q'), 'i').test(row.s)
      );
   }
   // 2. slice
   let begin = 0;
   if (param.has('v')) {
      let id = param.get('v');
      begin = table.findIndex(row => {
         const param = new URLSearchParams(row.q);
         // account for deleted entries
         return param.get('a') <= id;
      });
      if (begin == -1) {
         begin = 0;
      }
      id = table[begin][0];
      document.title = 'Umber - ' + date(id);
   }
   const page_n = 30;
   const slice_a = table.slice(begin, begin + page_n);
   const figs_o = document.getElementById('figures');
   for (const row_a of slice_a) {
      const fig_o = figure_f(row_a);
      figs_o.append(fig_o);
   }
   const old_o = document.getElementById('older');
   const old_n = begin + page_n;
   if (old_n < table.length) {
      const id = table[old_n][0];
      param.set('v', id);
      old_o.href = '?' + param.toString();
   } else {
      old_o.remove();
   }
   const new_o = document.getElementById('newer');
   const new_n = begin - page_n;
   if (new_n >= 0) {
      const id = table[new_n][0];
      param.set('v', id);
      new_o.href = '?' + param.toString();
   } else {
      new_o.remove();
   }
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
   const attr_m = href_src(site_s, date_s, audio_s, video_s);
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
   time_o.textContent = 'released ' + year_s + ' - posted ' + date(date_s);
   return fig_o;
}

fetch('/umber/umber.json').then(json).then(data);

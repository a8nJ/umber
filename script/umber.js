'use strict';
import {u_bandcamp} from '/umber/script/bandcamp.js';
import {f_github} from '/umber/script/github.js';
import {u_soundcloud} from '/umber/script/soundcloud.js';
import {f_youtube} from '/umber/script/youtube.js';

function u_figu(a_song) {
   const e_a = document.createElement('a');
   const e_figc = document.createElement('figcaption');
   const e_figu = document.createElement('figure');
   const e_img = document.createElement('img');
   const e_time = document.createElement('time');
   const m_song = {};
   m_song.post = a_song[0];
   m_song.rel = a_song[1];
   const a_host = a_song[2].split('/');
   m_song.site = a_host[0];
   m_song.url1 = a_host[1];
   m_song.url2 = a_host[2];
   m_song.title = a_song[3];
   const a_link = {
      b: u_bandcamp(m_song),
      g: f_github(m_song),
      s: u_soundcloud(m_song),
      y: f_youtube(m_song)
   }[m_song.site];
   e_a.href = a_link[0];
   e_img.src = a_link[1];
   e_figc.textContent = m_song.title;
   e_time.textContent = 'released ' + m_song.rel + ' - posted ' +
   new Date(m_song.post * 1000).toDateString();
   e_a.append(e_img, e_figc);
   e_figu.append(e_a, e_time);
   return e_figu;
}

// level 3
const o_par = new URLSearchParams(location.search);
// level 2
const n_page = o_par.has('p') ? Number(o_par.get('p')) : 1;
const n_step = 12;
// level 1
const n_begin = (n_page - 1) * n_step;
const n_end = n_begin + n_step - 1;
const s_json = '/umber/script/umber.json';
const s_query = o_par.has('q') ? o_par.get('q') : '';
const u_elem = s1 => document.getElementById(s1);

// "p" could be "1" implicitly or explicitly
if (n_page == 1) {
   u_elem('newer').remove();
} else {
   o_par.set('p', n_page - 1);
   u_elem('newer').href = '?' + o_par;
}

function u_in(s1, s2) {
   // both sides of the test can contain uppercase on mobile
   return s1.toLowerCase().includes(s2.toLowerCase());
}

fetch(s_json).then(o_resp => o_resp.json()).then(a_data => {
   let n_cur = 0;
   for (const a_rec of a_data) {
      // value match - move the cursor
      if (u_in(a_rec[1] + a_rec[3], s_query)) {
         // index match - add to DOM
         if (n_cur >= n_begin && n_cur <= n_end) {
            u_elem('figures').append(u_figu(a_rec));
         }
         n_cur++;
      }
      if (n_cur > n_end) {
         break;
      }
   }
   if (n_cur > n_end) {
      o_par.set('p', n_page + 1);
      u_elem('older').href = '?' + o_par;
   } else {
      u_elem('older').remove();
   }
});

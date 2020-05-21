'use strict';

export function f_soundcloud(s_id_2, s_id_3, s_title) {
   // <a>
   const o_a = document.createElement('a');
   const m_param = {
      url: 'api.soundcloud.com/tracks/' + s_id_2,
      // accepts "true" but not "1"
      hide_related: true,
      // these are not required, but it looks nicer
      show_comments: false,
      visual: true
   };
   const s_param = new URLSearchParams(m_param).toString();
   o_a.href = 'https://w.soundcloud.com/player?' + s_param + '#' + s_title;
   // <img>
   const o_img = document.createElement('img');
   o_img.src = 'https://i1.sndcdn.com/artworks-' + s_id_3 + '-t500x500.jpg';
   // return
   o_a.append(o_img);
   return o_a;
}

'use strict';

export function f_bandcamp(s_id_2, s_id_3, s_title) {
   // <a>
   const o_a = document.createElement('a');
   const m_param = {
      track: s_id_2,
      // required when protocol is not "file:"
      ref: '',
      // these are not required, but they look nicer
      artwork: 'small',
      size: 'large'
   };
   const s_param = new URLSearchParams(m_param).toString();
   // case sensitive
   o_a.href = 'https://bandcamp.com/EmbeddedPlayer?' + s_param + '#' + s_title;
   // <img>
   const o_img = document.createElement('img');
   o_img.src = 'https://f4.bcbits.com/img/' + s_id_3 + '_16.jpg';
   // return
   o_a.append(o_img);
   return o_a;
}

'use strict';

export function f_bandcamp(s_id_2, s_id_3) {
   const m_in = {
      // optional
      artwork: 'small',
      // required when protocol is not "file:"
      ref: '',
      // optional
      size: 'large',
      // required
      track: s_id_2
   };
   const o = new URLSearchParams(m_in);
   const s = o.toString();
   return {
      // case sensitive
      href: 'https://bandcamp.com/EmbeddedPlayer?' + s,
      src: 'https://f4.bcbits.com/img/' + s_id_3 + '_5.jpg'
   };
}

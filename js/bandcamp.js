'use strict';

export function f_bandcamp(s_id_2, s_id_3) {
   const m_in = {};
   // optional
   m_in.artwork = 'small';
   // required when protocol is not "file:"
   m_in.ref = '';
   // optional
   m_in.size = 'large';
   // required
   m_in.track = s_id_2;
   const m_out = {};
   // case sensitive
   const o = new URLSearchParams(m_in);
   m_out.href = 'https://bandcamp.com/EmbeddedPlayer?' + o.toString();
   m_out.src = 'https://f4.bcbits.com/img/' + s_id_3 + '_5.jpg';
   return m_out;
}

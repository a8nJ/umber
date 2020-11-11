'use strict';

export function bandcamp_f(audio_s, video_s) {
   const in_m = {
      // optional
      artwork: 'small',
      // required when protocol is not "file:"
      ref: '',
      // optional
      size: 'large',
      // required
      track: audio_s
   };
   const o = new URLSearchParams(in_m);
   const s = o.toString();
   return {
      // case sensitive
      href: 'https://bandcamp.com/EmbeddedPlayer?' + s,
      src: 'https://f4.bcbits.com/img/' + video_s + '_5.jpg'
   };
}

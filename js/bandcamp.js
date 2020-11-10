'use strict';

export function BandcampF(AudioS, VideoS) {
   const InM = {
      // optional
      artwork: 'small',
      // required when protocol is not "file:"
      ref: '',
      // optional
      size: 'large',
      // required
      track: AudioS
   };
   const o = new URLSearchParams(InM);
   const s = o.toString();
   return {
      // case sensitive
      href: 'https://bandcamp.com/EmbeddedPlayer?' + s,
      src: 'https://f4.bcbits.com/img/' + VideoS + '_5.jpg'
   };
}

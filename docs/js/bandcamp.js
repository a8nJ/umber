'use strict';

export const f_bandcamp = function (song) {
   const o_a = new URL('https://bandcamp.com');
   // case sensitive
   o_a.pathname = 'EmbeddedPlayer';
   o_a.hash = song.title;
   o_a.searchParams.set('track', song.url1);
   // required when protocol is not "file:"
   o_a.searchParams.set('ref', '');
   // these are not required, but they look nicer
   o_a.searchParams.set('artwork', 'small');
   o_a.searchParams.set('size', 'large');
   const o_img = new URL('https://f4.bcbits.com');
   o_img.pathname = 'img/' + song.url2 + '_16.jpg';
   return [o_a, o_img];
};

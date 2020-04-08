'use strict';

export const f_github = function (song) {
   // <a>
   const o_a = new URL(location.origin);
   o_a.pathname = 'umber/listen';
   o_a.searchParams.set('v', song.post);
   // <img>
   const o_img = new URL('https://github.com');
   o_img.pathname = 'muv1/umber/releases/download/' + song.url1 + '/image.jpg';
   // return
   return [o_a, o_img];
};

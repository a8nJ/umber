'use strict';

export const f_github = function (m_song) {
   // <a>
   const o_a = new URL(location.origin);
   o_a.pathname = '/umber/listen';
   o_a.searchParams.set('v', m_song.post);
   // <img>
   const o_img = new URL('https://github.com');
   o_img.pathname = 'muv1/umber/releases/download/' + m_song.url1 + '/image.jpg';
   // return
   return [o_a, o_img];
};

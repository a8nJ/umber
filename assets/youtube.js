'use strict';

export const f_youtube = function (m_song) {
   const o_href = new URL('https://www.youtube.com');
   // video unavailable: youtube.com/embed/4Dcoz65iKQM
   o_href.pathname = 'watch';
   o_href.searchParams.set('v', m_song.url1);
   o_href.hash = m_song.title;
   const o_src = new URL('https://i.ytimg.com');
   o_src.pathname = 'vi/' + m_song.url1 + '/sd1.jpg';
   return [o_href, o_src];
};

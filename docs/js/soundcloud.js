'use strict';

export const f_soundcloud = function (song) {
   const aurl = new URL('https://w.soundcloud.com');
   aurl.pathname = 'player';
   aurl.hash = song.title;
   aurl.searchParams.set('url', 'api.soundcloud.com/tracks/' + song.url1);
   // accepts "true" but not "1"
   aurl.searchParams.set('hide_related', true);
   // these are not required, but it looks nicer
   aurl.searchParams.set('show_comments', false);
   aurl.searchParams.set('visual', true);
   const iurl = new URL('https://i1.sndcdn.com');
   iurl.pathname =  'artworks-' + song.url2 + '-t500x500.jpg';
   return [aurl, iurl];
};

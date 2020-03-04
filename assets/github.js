'use strict';

export const u_github = function (song) {
   const aurl = new URL('https://cup.github.io');
   aurl.pathname =  'umber/listen';
   aurl.searchParams.set('v', song.post);
   const iurl = new URL('https://github.com');
   iurl.pathname = 'cup/umber/releases/download/' + song.url1 + '/image.jpg';
   return [aurl, iurl];
};

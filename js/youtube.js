'use strict';

export function YoutubeF(AudioS, VideoS) {
   const m = {href: 'https://www.youtube.com/watch?v=' + AudioS};
   if (VideoS != '') {
      m.src = 'https://i.ytimg.com/vi/' + AudioS + '/' + VideoS + '.jpg';
   } else {
      m.src = 'https://i.ytimg.com/vi/' + AudioS + '/sddefault.jpg';
   }
   return m;
}

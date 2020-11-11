'use strict';

export function youtube_f(audio_s, video_s) {
   const m = {href: 'https://www.youtube.com/watch?v=' + audio_s};
   if (video_s != '') {
      m.src = 'https://i.ytimg.com/vi/' + audio_s + '/' + video_s + '.jpg';
   } else {
      m.src = 'https://i.ytimg.com/vi/' + audio_s + '/sddefault.jpg';
   }
   return m;
}

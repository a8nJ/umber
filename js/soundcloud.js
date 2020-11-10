'use strict';

export function SoundcloudF(AudioS, VideoS) {
   const InM = {};
   // accepts "true" but not "1"
   InM.hide_related = true;
   // optional
   InM.show_comments = false;
   // required
   InM.url = 'api.soundcloud.com/tracks/' + AudioS;
   // optional
   InM.visual = true;
   const OutM = {};
   const InO = new URLSearchParams(InM);
   OutM.href = 'https://w.soundcloud.com/player?' + InO.toString();
   OutM.src = 'https://i1.sndcdn.com/artworks-' + VideoS + '-t500x500.jpg';
   return OutM;
}

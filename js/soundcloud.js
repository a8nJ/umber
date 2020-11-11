'use strict';

export function soundcloud_f(audio_s, video_s) {
   const in_m = {};
   // accepts "true" but not "1"
   in_m.hide_related = true;
   // optional
   in_m.show_comments = false;
   // required
   in_m.url = 'api.soundcloud.com/tracks/' + audio_s;
   // optional
   in_m.visual = true;
   const out_m = {};
   const in_o = new URLSearchParams(in_m);
   out_m.href = 'https://w.soundcloud.com/player?' + in_o.toString();
   out_m.src = 'https://i1.sndcdn.com/artworks-' + video_s + '-t500x500.jpg';
   return out_m;
}

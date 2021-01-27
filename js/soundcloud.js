'use strict';

export function soundcloud(param) {
   const play = new URLSearchParams({
      // accepts "true" but not "1"
      hide_related: true,
      // optional
      show_comments: false,
      // required
      url: 'api.soundcloud.com/tracks/' + param.get('b'),
      // optional
      visual: true
   });
   return {
      href: 'https://w.soundcloud.com/player?' + play.toString(),
      src: 'https://i1.sndcdn.com/' + param.get('c') + '-t500x500.jpg'
   };
}

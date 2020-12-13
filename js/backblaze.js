'use strict';

export function backblaze_f(date_s, jpg_s) {
   return {
      href: location.origin + '/umber/backblaze?v=' + date_s,
      src: 'https://f002.backblazeb2.com/file/ql8mlh/' + jpg_s + '.jpg'
   };
}

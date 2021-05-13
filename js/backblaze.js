'use strict';
const bucket = 'https://f002.backblazeb2.com/file/ql8mlh/';

export function backblaze(q, s) {
   return {
      href: bucket + s + '.' + q.get('p'),
      src: bucket + q.get('b') + '.jpg'
   };
}

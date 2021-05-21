'use strict';
// Friendly URL does not cache
const bucket = 'https://ql8mlh.s3.us-west-002.backblazeb2.com/';

export function backblaze(q, s) {
   return {
      href: bucket + s + '.' + q.get('p'),
      src: bucket + q.get('b') + '.jpg'
   };
}

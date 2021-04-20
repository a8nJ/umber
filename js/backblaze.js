'use strict';
const bucket = 'https://f002.backblazeb2.com/file/ql8mlh/';

export function backblaze(param) {
   return {
      href: bucket + param.get('a') + '.' + param.get('p'),
      src: bucket + param.get('b') + '.jpg'
   };
}

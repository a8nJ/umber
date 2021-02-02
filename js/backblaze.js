'use strict';

export function backblaze(param) {
   const m = {};
   m.href = location.origin + '/umber/backblaze?a=' + param.get('a');
   m.src = 'https://f002.backblazeb2.com/file/ql8mlh/' + param.get('b') + '.jpg';
   return m;
}

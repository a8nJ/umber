'use strict';

export function youtube(param) {
   const m = {};
   m.href = 'https://www.youtube.com/watch?v=' + param.get('b');
   m.src = 'https://i.ytimg.com/vi/' + param.get('b') + '/';
   if (param.has('c')) {
      m.src += param.get('c') + '.jpg';
   } else {
      m.src += 'sddefault.jpg';
   }
   return m;
}

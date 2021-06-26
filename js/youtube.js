'use strict';

export function youtube(param) {
   const m = {};
   m.href = 'https://www.youtube.com/watch?v=' + param.get('b');
   if (param.has('c')) {
      m.src = param.get('c');
   } else {
      m.src = 'sddefault.webp';
   }
   m.src = param.get('b') + '/' + m.src;
   // need HTTPS to avoid "Parts of this page are not secure"
   if (m.src.endsWith('.webp')) {
      m.src = 'https://i.ytimg.com/vi_webp/' + m.src;
   } else {
      m.src = 'https://i.ytimg.com/vi/' + m.src;
   }
   return m;
}

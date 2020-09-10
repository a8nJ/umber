'use strict';

export function f_youtube(s_id_2, s_id_3) {
   const m = {href: 'https://www.youtube.com/watch?v=' + s_id_2};
   if (s_id_3 != '') {
      m.src = 'https://i.ytimg.com/vi/' + s_id_2 + '/' + s_id_3 + '.jpg';
   } else {
      m.src = 'https://i.ytimg.com/vi/' + s_id_2 + '/sddefault.jpg';
   }
   return m;
}

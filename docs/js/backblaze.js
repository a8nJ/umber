'use strict';

export function f_backblaze(s_id_1, s_id_2) {
   // <a>
   const o_a = document.createElement('a');
   o_a.href = location.origin + '/umber/backblaze?v=' + s_id_1;
   // <img>
   const o_img = document.createElement('img');
   o_img.src = 'https://f002.backblazeb2.com/file/0Tl4aD/' + s_id_2 + '.jpg';
   // return
   o_a.append(o_img);
   return o_a;
}
